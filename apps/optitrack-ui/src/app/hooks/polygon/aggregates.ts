import { useState, useEffect } from 'react'

const pKey = import.meta.env.VITE_POLYGON_KEY

export interface UsePolygonProps {
  symbol: string
  multiplier: number
  timespan: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year'
  from: string
  to: string
}

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

interface PolygonAggregateResponse {
  status: string
  ticker: string
  queryCount: number
  resultsCount: number
  count: number
  request_id: string
  adjusted: boolean
  results: PolygonAggregateResult[]
}


export const usePolygonAggregates = ({ symbol, multiplier, timespan, from, to }:UsePolygonProps ) => {
  const [data, setData] = useState<PolygonAggregateResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const aggregatesBaseURL = 'https://api.polygon.io/v2/aggs/ticker'
      const res = await fetch(`${aggregatesBaseURL}/${symbol}/range/${multiplier}/${timespan}/${from}/${to}`, {
        cache: 'force-cache',
        headers: {
          'Authorization': `Bearer ${pKey}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })

      if (!res.ok) {
        throw new Error('Network error getting polygon data')
      }

      const json = await res.json()
      return json
    }

    setIsLoading(true)
    setError(null)

    fetchData()
      .then(res => {
        setData(res)
        setError(null)
        setIsLoading(false)
      })
      .catch(err => {
        setError(err)
        setData(null)
        setIsLoading(false)
      })

  }, [from, multiplier, symbol, timespan, to])

  return { data, isLoading, error }
}

export default usePolygonAggregates
