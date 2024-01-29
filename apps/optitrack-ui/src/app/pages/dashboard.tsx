import { Grid, Col } from '@tremor/react'

import { Overview, AssetPriceChart, AssetPriceList, FundAssetList, MarketTrendsList } from '../components/'

export const Dashboard = () => {
  return (
    <Grid className="p-2 gap-2" numItems={1} numItemsSm={2}>
      <Col numColSpan={1}>
        <Overview />
      </Col>
      <Col numColSpan={1}>
        <FundAssetList />
      </Col>
      <Col numColSpan={1} numColSpanSm={2}>
        <AssetPriceChart />
      </Col>
      <Col numColSpan={1}>
        <AssetPriceList />
      </Col>
      <Col numColSpan={1}>
        <MarketTrendsList />
      </Col>
    </Grid>
  )
}
