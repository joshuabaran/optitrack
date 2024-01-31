interface PolygonAggregateResult {
  c: number
  h: number
  l: number
  n: number
  o: number
  t: number
  v: number
  vw: number
  otc?: boolean
}

export interface PolygonAggregateResponse {
  status: string
  ticker: string
  queryCount: number
  resultsCount: number
  count: number
  request_id: string
  adjusted: boolean
  results: PolygonAggregateResult[]
}

export interface UsePolygonProps {
  symbol: string
  multiplier: number
  timespan: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year'
  from: string
  to: string
}

export const getPolygonAggregates = async ({ symbol, multiplier, timespan, from, to }:UsePolygonProps ) => {
  const pKey = import.meta.env.VITE_POLYGON_KEY
  const aggregatesBaseURL = 'https://api.polygon.io/v2/aggs/ticker'
  const res = await fetch(`${aggregatesBaseURL}/${symbol}/range/${multiplier}/${timespan}/${from}/${to}?sort=desc`, {
    headers: {
      'Authorization': `Bearer ${pKey}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  if (!res.ok) {
    throw new Error('Network error getting polygon data')
  }

  const json: PolygonAggregateResponse = await res.json()
  return json
}

export default getPolygonAggregates
