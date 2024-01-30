export interface IFund {
  name: string
  totalHoldings: number
  turnOver: number
  totalAssets: string
  performance: IFundPerformance[]
}

export interface IFundPerformance {
  name: string
  symbol: string
  nav: number
  change: number
  month: number
  quarter: number
  year: number
}

export const fundData: IFund = {
  name: "SuperFund",
  totalHoldings: 12,
  turnOver: 102,
  totalAssets: "$3.4M",
  performance: [
    { name: 'Class A', symbol: 'LMNOA', nav: 12.04, change: -0.09, month: 4.6, quarter: 5.1, year: 5.3 },
    { name: 'Class B', symbol: 'LMNOB', nav: 12.14, change: -0.07, month: 4.6, quarter: 5.1, year: 5.3 }
  ]
}
