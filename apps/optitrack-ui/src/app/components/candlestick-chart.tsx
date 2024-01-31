import { useLayoutEffect } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5stock from '@amcharts/amcharts5/stock'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark'

import { getPolygonAggregates } from '../data'
import { Loading } from './loading'
import { usePrefersDarkMode } from '../hooks'

export interface ICandlestickChartProps {
  selectedSymbol: string
}

export function CandlestickChart(props: ICandlestickChartProps) {
  const { selectedSymbol } = props
  const from = moment().subtract(1, 'years').format('YYYY-MM-DD')
  const to = moment().format('YYYY-MM-DD')
  const timespan = 'day'
  const multiplier = 1

  const { data, isLoading } = useQuery({
    queryKey: `${selectedSymbol}-candlestick`,
    queryFn: () => getPolygonAggregates({ symbol: selectedSymbol, multiplier, timespan, from, to }),
    staleTime: 1000 * 60 * 60
  })
  const dm = usePrefersDarkMode()

  useLayoutEffect(() => {
    const chartRoot = am5.Root.new('stock-chart')
    chartRoot.numberFormatter.set('numberFormat', '#,###.00')

    const themes: am5.Theme[] = [
      am5themes_Animated.new(chartRoot)
    ]
    dm && themes.push(am5themes_Dark.new(chartRoot))
    chartRoot.setThemes(themes)

    const stockChart = chartRoot.container.children.push(
      am5stock.StockChart.new(chartRoot, {
        stockPositiveColor: am5.color(0x009900),
        stockNegativeColor: am5.color(0x990000),
        volumePositiveColor: am5.color(0x6666FF),
        volumeNegativeColor: am5.color(0x6666FF)
      })
    )

    const mainPanel = stockChart.panels.push(am5stock.StockPanel.new(chartRoot, {
      height: am5.percent(70),
      panX: true,
      panY: false,
    }))
    mainPanel.panelControls.closeButton.set('forceHidden', true)

    const volumePanel = stockChart.panels.push(am5stock.StockPanel.new(chartRoot, {
      panX: true,
      panY: false,
      height: am5.percent(30),
      paddingTop: 6,
      paddingBottom: 15
    }))
    volumePanel.panelControls.closeButton.set('forceHidden', true)

    const volumeDateAxis = volumePanel.xAxes.push(am5xy.GaplessDateAxis.new(chartRoot, {
      baseInterval: {
        timeUnit: timespan,
        count: multiplier
      },
      renderer: am5xy.AxisRendererX.new(chartRoot, {
        minorGridEnabled: true
      }),
      tooltip: am5.Tooltip.new(chartRoot, {
        forceHidden: true
      }),
      height: 0
    }))
    volumeDateAxis.get('renderer').labels.template.set('forceHidden', true)

    const volumeAxisRenderer = am5xy.AxisRendererY.new(chartRoot, {
      pan: 'zoom'
    });
    
    const volumeValueAxis = volumePanel.yAxes.push(am5xy.ValueAxis.new(chartRoot, {
      numberFormat: '#.#a',
      renderer: volumeAxisRenderer
    }))

    const valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(chartRoot, {
      renderer: am5xy.AxisRendererY.new(chartRoot, {
        pan: 'zoom'
      }),
      extraMin: 0.1, // adds some space for for main series
      tooltip: am5.Tooltip.new(chartRoot, {}),
      numberFormat: '#,###.00',
      extraTooltipPrecision: 2
    }))

    const dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(chartRoot, {
      baseInterval: {
        timeUnit: timespan,
        count: multiplier
      },
      renderer: am5xy.AxisRendererX.new(chartRoot, {
        minorGridEnabled: true
      }),
      tooltip: am5.Tooltip.new(chartRoot, {})
    }))

    const valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(chartRoot, {
      name: selectedSymbol,
      clustered: false,
      valueXField: 't',
      valueYField: 'c',
      highValueYField: 'h',
      lowValueYField: 'l',
      openValueYField: 'o',
      calculateAggregates: true,
      xAxis: dateAxis,
      yAxis: valueAxis,
      legendValueText: 'open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]',
      legendRangeValueText:'',
      snapTooltip: true
    }))

    const volumeSeries = volumePanel.series.push(am5xy.ColumnSeries.new(chartRoot, {
      name: 'Volume',
      clustered: false,
      valueXField: 't',
      valueYField: 'v',
      xAxis: dateAxis,
      yAxis: volumeValueAxis,
      legendValueText: '[bold]{valueY.formatNumber("#,###.0a")}[/]',
      snapTooltip: true
    }))

    volumeSeries.columns.template.setAll({
      strokeOpacity: 0,
      fillOpacity: 1
    })

    volumeSeries.columns.template.adapters.add('fill', function (fill, target) {
      const dataItem = target.dataItem
      if (dataItem) {
        return stockChart.getVolumeColor(dataItem)
      }
      return fill
    })

    const valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(chartRoot, {
      stockChart: stockChart
    }))
    valueLegend.settingsButtons.template.set('visible', false)
    valueLegend.data.setAll([valueSeries])

    const volumeLegend = volumePanel.plotContainer.children.push(am5stock.StockLegend.new(chartRoot, {
      stockChart: stockChart
    }))
    volumeLegend.settingsButtons.template.set('visible', false)
    volumeLegend.data.setAll([volumeSeries])

    stockChart.set('stockSeries', valueSeries)
    stockChart.set('volumeSeries', volumeSeries)
    valueSeries.data.setAll(data?.results || [])
    volumeSeries.data.setAll(data?.results || [])

    mainPanel.set('cursor', am5xy.XYCursor.new(chartRoot, {
      yAxis: valueAxis,
      xAxis: dateAxis,
      snapToSeries: [valueSeries],
      snapToSeriesBy: 'y!'
    }))

    const scrollbar = mainPanel.set('scrollbarX', am5xy.XYChartScrollbar.new(chartRoot, {
      orientation: 'horizontal',
      height: 50
    }));
    mainPanel.bottomAxesContainer.children.push(scrollbar);

    const sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(chartRoot, {
      baseInterval: {
        timeUnit: timespan,
        count: multiplier
      },
      renderer: am5xy.AxisRendererX.new(chartRoot, {
        minorGridEnabled: true
      })
    }))

    const sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(chartRoot, {
      renderer: am5xy.AxisRendererY.new(chartRoot, {})
    }))

    const sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(chartRoot, {
      valueYField: 'c',
      valueXField: 't',
      xAxis: sbDateAxis,
      yAxis: sbValueAxis
    }))
    sbSeries.fills.template.setAll({
      visible: true,
      fillOpacity: 0.2
    })
    sbSeries.data.setAll(data?.results || [])

    return () => {
      chartRoot.dispose()
    }
  }, [data, selectedSymbol, dm])

  return (
    <>
      {isLoading ? (<Loading />) : (null)}
      <div id="stock-chart" style={{ width: 'auto', height: 500 }}></div>
    </>
  )
}
