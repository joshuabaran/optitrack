import {
  Card,
  Title,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from '@tremor/react'
import { useQuery } from 'react-query'
import moment from 'moment'

import { getPolygonAggregates } from '../data'

export interface IAssetPriceListProps {
  selectedSymbol: string
}

export const AssetPriceList = (props: IAssetPriceListProps) => {
  const { selectedSymbol } = props
  const from = moment().subtract(1, 'years').format('YYYY-MM-DD')
  const to = moment().format('YYYY-MM-DD')
  const timespan = 'day'
  const multiplier = 1

  const { data } = useQuery({
    queryKey: `${selectedSymbol}-candlestick`,
    queryFn: () => getPolygonAggregates({ symbol: selectedSymbol, multiplier, timespan, from, to }),
    staleTime: 1000 * 60 * 60
  })

  return (
    <Card>
      <Title>{`Price History - ${selectedSymbol}`}</Title>
      <Table className="max-h-96 overflow-auto">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Open</TableHeaderCell>
            <TableHeaderCell>High</TableHeaderCell>
            <TableHeaderCell>Low</TableHeaderCell>
            <TableHeaderCell>Close</TableHeaderCell>
            <TableHeaderCell>Volume</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.results.map((result, idx) => (
            <TableRow key={idx}>
              <TableCell>{moment(result.t).format('YYYY-MM-DD')}</TableCell>
              <TableCell>{result.o}</TableCell>
              <TableCell>{result.h}</TableCell>
              <TableCell>{result.l}</TableCell>
              <TableCell>{result.c}</TableCell>
              <TableCell>{result.v}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
