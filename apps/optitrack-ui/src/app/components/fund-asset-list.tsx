import { useEffect } from 'react'
import {
  Card,
  Text,
  Flex
} from '@tremor/react'

import { IAsset } from '../../../data/fund'

export interface IFundAssetListProps {
  assets: IAsset[]
  selected: number
  setSelected: (index: number) => void
}

export const FundAssetList = (props: IFundAssetListProps) => {
  const { assets, selected, setSelected } = props

  useEffect(() => {
    console.log(`FundAssetList: selected=${selected}`)
  }, [selected])

  return (
    <Card>
      <Text>Asset List</Text>
      <Flex flexDirection="col" className="max-h-[700px] overflow-y-auto overflow-x-hidden p-10">
        {assets.map((asset, idx) => (
          <Card className="m-2 hover:cursor-pointer hover:border-orange-600" decoration="left" onClick={(evt) => {setSelected(idx)}}>
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
