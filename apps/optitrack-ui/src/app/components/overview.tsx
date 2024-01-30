import {
  BadgeDelta,
  Card,
  Metric,
  Text,
  Title,
  Flex,
  DonutChart
} from '@tremor/react'

import { IFund, IFundOffering, IAsset } from '../../../data/fund'

interface IOfferingCardProps {
  offering: IFundOffering
}

const OfferingCard = (props: IOfferingCardProps) => {
  const { offering } = props

  return (
    <Card className="m-2" decoration="left">
      <Flex justifyContent="start">
        <Flex flexDirection="col" alignItems="start">
          <Title>{offering.name}</Title>
          <Text>{offering.symbol}</Text>
        </Flex>
        <Flex justifyContent="end">
          <Text>NAV</Text>
          <Metric className="mx-2">{`$${offering.nav}`}</Metric>
          {/* TODO: fix badge */}
          <BadgeDelta size="xs">{`${offering.change}%`}</BadgeDelta>
        </Flex>
      </Flex>
    </Card>
  )
}

interface IDistributionChartProps {
  data: IAsset[]
  index: string
  category: string
}

const DistributionChart = (props: IDistributionChartProps) => {
  const { data, index, category } = props
  return (
    <Card className="mt-2">
      <Title>Distribution</Title>
      <DonutChart
        data={data}
        index={index}
        category={category}
        variant="pie"
        showLabel={false}
        className="h-80"
      />
    </Card>
  )
}

export interface IOverviewProps {
  fund: IFund | null
}

export const Overview = (props: IOverviewProps) => {
  const { fund } = props

  return (
    <Card>
      <Metric className="mb-4">{fund?.name}</Metric>
      <Text>{fund?.totalHoldings}</Text>
      <Text>{fund?.turnOver}</Text>
      <Text>{fund?.totalAssets}</Text>
      <Flex flexDirection="col">
        {fund?.offerings?.map((o, idx) => <OfferingCard key={idx} offering={o} />) || []}
      </Flex>
      <DistributionChart data={fund?.assets || []} category="percentage" index="sector" />
    </Card>
  )
}
