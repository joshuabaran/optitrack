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
  const navFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'})

  return (
    <Card className="m-1" decoration="left">
      <Flex justifyContent="start">
        <Flex flexDirection="col" alignItems="start">
          <Title>{offering.name}</Title>
          <Text>{offering.symbol}</Text>
        </Flex>
        <Flex justifyContent="end">
          <Text>NAV</Text>
          <Metric className="mx-2">{navFormatter.format(offering.nav)}</Metric>
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
    <Card className="mt-1">
      <Title>Distribution</Title>
      <DonutChart
        data={data}
        index={index}
        category={category}
        variant="pie"
        showLabel={false}
      />
    </Card>
  )
}

export interface IOverviewProps {
  fund: IFund | null
}

export const Overview = (props: IOverviewProps) => {
  const { fund } = props
  const assetsFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', compactDisplay: 'short'})

  return (
    <Card>
      <Flex flexDirection="col" alignItems="start">
        <Metric className="mb-1">{fund?.name}</Metric>
        <Flex justifyContent="start">
          <Text>Total Holdings:&nbsp;</Text>
          <Text>{fund?.totalHoldings}</Text>
        </Flex>
        <Flex justifyContent="start">
          <Text>Turnover:&nbsp;</Text>
          <Text>{fund?.turnOver}%</Text>
        </Flex>
        <Flex justifyContent="start">
          <Text>Total Assets:&nbsp;</Text>
          <Text>{assetsFormatter.format(fund?.totalAssets || 0)}</Text>
        </Flex>
        <Flex flexDirection="col">
          {fund?.offerings?.map((o, idx) => <OfferingCard key={idx} offering={o} />) || []}
        </Flex>
        <DistributionChart data={fund?.assets || []} category="percentage" index="sector" />
      </Flex>
    </Card>
  )
}
