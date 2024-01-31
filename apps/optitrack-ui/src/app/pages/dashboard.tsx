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
  const { data, isLoading } = useQuery({queryKey: ['overview'], queryFn: getFund})

  const selectedSymbol = useMemo(() => {
    return data?.assets[selectedAsset].symbol || null
  }, [selectedAsset, data])

  return (
    <Grid className="p-2 gap-2" numItems={1} numItemsLg={2}>
      {isLoading ? (<Loading />) : (<>
        <Col numColSpan={1}>
          <Overview fund={data || null} />
        </Col>
        <Col numColSpan={1}>
          <FundAssetList assets={data?.assets || []} selected={selectedAsset} setSelected={setSelectedAsset} />
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          <AssetPriceChart selectedSymbol={selectedSymbol} />
        </Col>
        <Col numColSpan={1}>
          {selectedSymbol ? (<AssetPriceList selectedSymbol={selectedSymbol} />) : (null)}
        </Col>
        <Col numColSpan={1}>
          <MarketTrendsList />
        </Col>
      </>)}
    </Grid>
  )
}
