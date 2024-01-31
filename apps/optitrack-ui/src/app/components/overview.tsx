import { useMemo } from 'react'
import {
  BadgeDelta,
  Card,
  Metric,
  Text,
  Title,
  Flex,
  DonutChart,
  Icon,
  Legend
} from '@tremor/react'

import { getSectorMetaByKey, getSectorMetaByName, getDeltaType } from '../util'
import { IFund, IFundOffering } from '../../../data/fund'

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
          <BadgeDelta size="xs" deltaType={getDeltaType(offering.change)}>{`${offering.change}%`}</BadgeDelta>
        </Flex>
      </Flex>
    </Card>
  )
}

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
    <Card className="mt-1">
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

export interface IOverviewProps {
  fund: IFund | null
}

export const Overview = (props: IOverviewProps) => {
  const { fund } = props
  const assetsFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', compactDisplay: 'short'})

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
        <DistributionChart data={sectorDistribution} category="percentage" index="sector" />
      </Flex>
    </Card>
  )
}
