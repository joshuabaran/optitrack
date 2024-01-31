import { useQuery } from 'react-query'
import moment from 'moment'
import { ChartPieIcon } from '@heroicons/react/24/solid'
import {
  Card,
  Text,
  Title,
  Flex,
  SparkAreaChart,
  Icon,
  IconProps,
  Badge
} from '@tremor/react'

import { Loading } from './loading'
import { getPolygonAggregates } from '../data'
import { getSectorMetaByKey } from '../util'
import { IAsset } from '../../../data/fund'

interface IAssetsListCardProps {
  asset: IAsset
  idx: number
  selected: boolean
  setSelected: (index: number) => void
}

const AssetsListCard = (props: IAssetsListCardProps) => {
  const { asset, idx, selected, setSelected } = props
  const from = moment().subtract(30, 'days').format('YYYY-MM-DD')
  const to = moment().format('YYYY-MM-DD')
  const sectorMeta = getSectorMetaByKey(asset.sector)

  const { data, isLoading } = useQuery({
    queryKey: `${asset.symbol}-spark`,
    queryFn: () => getPolygonAggregates({ symbol: asset.symbol, multiplier: 1, timespan: 'day', from, to }),
    staleTime: 1000 * 60 * 60
  })

  return (
    <Card className="m-1 hover:cursor-pointer hover:border-orange-600" decoration="left" decorationColor={selected ? "green": "blue"} onClick={(evt) => {setSelected(idx)}}>
      <Flex justifyContent="between" className="w-100">
        <Flex flexDirection="col" alignItems="start" className="w-auto">
          <Title>{asset.name}</Title>
          <Text>{asset.symbol}</Text>
        </Flex>
        <Flex className="w-auto">
          <Badge icon={ChartPieIcon} className="mr-8">{asset.percentage}% of total</Badge>
          <Icon icon={sectorMeta.Icon} variant="simple" tooltip={sectorMeta.name} color={sectorMeta.color as IconProps["color"]} size="xl" className="mr-8" />
          {(data && !isLoading) ? (<SparkAreaChart data={data.results} categories={['c']} index="t" connectNulls={true} />) : (<Loading />)}
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

  return (
    <Card>
      <Flex flexDirection="col" className="max-h-[520px] overflow-y-auto overflow-x-hidden p-4">
        {assets.map((asset, idx) => (
          <AssetsListCard key={idx} asset={asset} idx={idx} selected={(idx === selected)} setSelected={setSelected} />
        ))}
      </Flex>
    </Card>
  )
}
