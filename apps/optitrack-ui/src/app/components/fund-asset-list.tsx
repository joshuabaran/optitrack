import {
  Card,
  Text,
  Flex
} from '@tremor/react'

import { IAsset } from '../../../data/fund'

export interface IFundAssetListProps {
  assets: IAsset[]
}

export const FundAssetList = (props: IFundAssetListProps) => {
  const { assets } = props

  return (
    <Card>
      <Text>Asset List</Text>
      <Flex flexDirection="col" className="max-h-[700px] overflow-y-auto overflow-x-hidden p-10">
        {assets.map((asset) => (
          <Card className="m-2" decoration="left">
            <Text>{asset.name}</Text>
            <Text>{asset.symbol}</Text>
            <Text>{asset.sector}</Text>
            <Text>{asset.percentage}</Text>
          </Card>
        ))}
      </Flex>
    </Card>
  )
}
