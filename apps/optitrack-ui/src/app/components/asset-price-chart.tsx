import { Card, Text } from '@tremor/react'

export interface IAssetPriceChartProps {
  selectedSymbol: string | null
}

export const AssetPriceChart = (props: IAssetPriceChartProps) => {
  return (
    <Card>
      <Text>Asset Price Chart</Text>
    </Card>
  )
}
