import { Grid, Col } from '@tremor/react'
import { useQuery } from 'react-query'

import {
  Overview,
  AssetPriceChart,
  AssetPriceList,
  FundAssetList,
  MarketTrendsList,
  Loading
} from '../components/'

import { getFund } from '../hooks'

export const Dashboard = () => {
  const { data: fundData, isLoading } = useQuery('overview', getFund)

  return (
    
      <Grid className="p-2 gap-2" numItems={1} numItemsMd={2}>
        {isLoading ? (<Loading />) : (<>
          <Col numColSpan={1}>
            <Overview fund={fundData || null} />
          </Col>
          <Col numColSpan={1}>
            <FundAssetList assets={fundData?.assets || []} />
          </Col>
          <Col numColSpan={1} numColSpanMd={2}>
            <AssetPriceChart />
          </Col>
          <Col numColSpan={1}>
            <AssetPriceList />
          </Col>
          <Col numColSpan={1}>
            <MarketTrendsList />
          </Col>
        </>)}
      </Grid>
  )
}
