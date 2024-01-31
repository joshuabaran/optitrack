import { useMemo } from 'react'
import { Card, Text, DonutChart, Icon, Legend, Metric, Title } from '@tremor/react'


import { getSectorMetaByName, getSectorMetaByKey } from '../util'
import { IFund } from '../../../data/fund'

interface ISectorDistribution {
  sector: string
  percentage: number
}

interface IDistributionChartProps {
  data: ISectorDistribution[]
  index: string
  category: string
}

const DistributionChart = (props: IDistributionChartProps) => {
  const { data, index, category } = props
  const sectorColors = useMemo(() => {
    return data.map((item) => getSectorMetaByName(item.sector).color)
  }, [data])
  return (
    <Card className="overflow-auto flex items-center min-h-[369px]">
      <DonutChart
        data={data}
        index={index}
        category={category}
        variant="pie"
        showLabel={false}
        colors={sectorColors}
        customTooltip={({ payload, active }) => {
          if (active && payload && payload.length) {
            const categoryPayload = payload?.[0]
            const sectorMeta = getSectorMetaByName(categoryPayload.name)

            return (
              <div className="flex items-center flex-row w-auto rounded-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border dark:bg-dark-tremor-background">
                <Icon icon={sectorMeta.Icon} variant="simple" tooltip={sectorMeta.name} color={categoryPayload.color} size="xl" className="mr-1" />
                <Text className="mr-4">{categoryPayload.name}</Text>
                <Metric>{categoryPayload.value.toFixed(1)}%</Metric>
              </div>
            )
          }

          return null
        }}
      />
      <Legend
        categories={data.map((item) => item.sector)}
        colors={data.map((item) => getSectorMetaByName(item.sector).color)}
       />
    </Card>
  )
}

export interface IMarketTrendsListProps {
  fund: IFund | null
}

export const MarketTrendsList = (props: IMarketTrendsListProps) => {
  const { fund } = props

  const sectorDistribution: ISectorDistribution[] = useMemo(() => {
    const acc: ISectorDistribution[] = []
    fund?.assets.forEach((asset, idx) => {
      const sectorMeta = getSectorMetaByKey(asset.sector)
      const xi = acc.findIndex((item) => item.sector === sectorMeta.name)
      if (xi > -1) {
        acc[xi].percentage += asset.percentage
      } else {
        acc.push({
          sector: sectorMeta.name,
          percentage: asset.percentage
        })
      }
    })

    return acc
  }, [fund])

  return (
    <Card>
      <Title className="mb-4">Portfolio Industry Weights</Title>
      <DistributionChart data={sectorDistribution} category="percentage" index="sector" />
    </Card>
  )
}
