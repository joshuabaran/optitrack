import { useState, useMemo } from 'react'
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
import { getFund } from '../data'

export const Dashboard = () => {
  const [selectedAsset, setSelectedAsset] = useState(0)
  const { data: fundData, isLoading: fundLoading } = useQuery('overview', getFund)

  const selectedSymbol = useMemo(() => {
    return fundData?.assets[selectedAsset].symbol || null
  }, [selectedAsset, fundData])

  return (
    
      <Grid className="p-2 gap-2" numItems={1} numItemsMd={2}>
        {fundLoading ? (<Loading />) : (<>
          <Col numColSpan={1}>
            <Overview fund={fundData || null} />
          </Col>
          <Col numColSpan={1}>
            <FundAssetList assets={fundData?.assets || []} selected={selectedAsset} setSelected={setSelectedAsset} />
          </Col>
          <Col numColSpan={1} numColSpanMd={2}>
            <AssetPriceChart selectedSymbol={selectedSymbol} />
          </Col>
          <Col numColSpan={1}>
            <AssetPriceList selectedSymbol={selectedSymbol} />
          </Col>
          <Col numColSpan={1}>
            <MarketTrendsList />
          </Col>
        </>)}
      </Grid>
  )
}
