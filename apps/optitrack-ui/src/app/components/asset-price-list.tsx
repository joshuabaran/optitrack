import { Card, Text } from '@tremor/react'

export interface IAssetPriceListProps {
  selectedSymbol: string | null
}

export const AssetPriceList = (props: IAssetPriceListProps) => {
  return (
    <Card>
      <Text>Asset Price List</Text>
    </Card>
  )
}
