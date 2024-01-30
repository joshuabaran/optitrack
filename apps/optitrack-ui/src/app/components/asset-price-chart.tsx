import { Card } from '@tremor/react'

import { CandlestickChart } from './candlestick-chart'

export interface IAssetPriceChartProps {
  selectedSymbol: string | null
}

export const AssetPriceChart = (props: IAssetPriceChartProps) => {
  const { selectedSymbol } = props

  return (
    <Card>
      {selectedSymbol ? (<CandlestickChart selectedSymbol={selectedSymbol} />) : (null)}
    </Card>
  )
}
