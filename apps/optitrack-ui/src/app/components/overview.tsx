import {
  BadgeDelta,
  Card,
  Metric,
  Text,
  Title,
  Flex
} from '@tremor/react'

import { IFund } from '../../../data/fund'

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
        {fund?.performance?.map((p, i) => {
          return (
            <Card key={i} className="m-4">
              <Flex justifyContent="start">
                <Flex flexDirection="col" alignItems="start">
                  <Title>{p.name}</Title>
                  <Text>{p.symbol}</Text>
                </Flex>
                <Flex justifyContent="start">
                  <Text>NAV</Text>
                  <Metric className="mx-2">{`$${p.nav}`}</Metric>
                  <BadgeDelta size="xs">{`${p.change}%`}</BadgeDelta>
                </Flex>
              </Flex>
            </Card>
          )
        }) || []}
      </Flex>
    </Card>
  )
}
