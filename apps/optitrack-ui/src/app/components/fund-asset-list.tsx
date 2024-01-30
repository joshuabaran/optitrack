import { useEffect } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import {
  Card,
  Text,
  Title,
  Flex,
  SparkAreaChart
} from '@tremor/react'

import { Loading } from './loading'
import { getPolygonAggregates } from '../data'
import { IAsset } from '../../../data/fund'


interface IAssestListCardProps {
  asset: IAsset
  idx: number
  selected: boolean
  setSelected: (index: number) => void
}
const AssestListCard = (props: IAssestListCardProps) => {
  const { asset, idx, selected, setSelected } = props
  const from = moment().subtract(15, 'days').format('YYYY-MM-DD')
  const to = moment().format('YYYY-MM-DD')
  const { data, isLoading, error } = useQuery(`${asset.symbol}-spark`, () => getPolygonAggregates({ symbol: asset.symbol, multiplier: 1, timespan: 'day', from, to }))

  useEffect(() => {
    console.log('AssestListCard:', { data, isLoading, error })
  }, [data, isLoading, error])

  return (
    <Card className="m-2 hover:cursor-pointer hover:border-orange-600" decoration="left" decorationColor={selected ? "green": "blue"} onClick={(evt) => {setSelected(idx)}}>
      <Flex justifyContent="between" className="w-100">
        <Flex flexDirection="col" alignItems="start" className="w-auto">
          <Title>{asset.name}</Title>
          <Text>{asset.symbol}</Text>
        </Flex>
        <Flex className="w-auto">
          <Text>{asset.sector}</Text>
          <Text>{asset.percentage}</Text>
        </Flex>
        <Flex className="w-auto">
          {(data && !isLoading) ? (<SparkAreaChart data={data?.results} categories={['c']} index="t" />) : (
            <Loading />
          )}
        </Flex>
      </Flex>
    </Card>
  )
}

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
          <AssestListCard key={idx} asset={asset} idx={idx} selected={(idx === selected)} setSelected={setSelected} />
        ))}
      </Flex>
    </Card>
  )
}
