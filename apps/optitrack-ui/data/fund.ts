export interface IFund {
  name: string
  totalHoldings: number
  turnOver: number
  totalAssets: number
  offerings: IFundOffering[]
  assets: IAsset[]
}

export interface IFundOffering {
  name: string
  symbol: string
  nav: number
  change: number
  month: number
  quarter: number
  year: number
}

export interface IAsset {
  name: string
  symbol: string
  percentage: number
  sector: 'energy' | 'materials' | 'industrials' | 'consumerDiscretionary' | 'consumerStaples' | 'healthCare' | 'financials' | 'informationTechnology' | 'communicationServices' | 'utilities' | 'realEstate'
}

export const fundData: IFund = {
  name: "LMNOFund",
  totalHoldings: 12,
  turnOver: 102,
  totalAssets: 3400000,
  offerings: [
    { name: 'Class A', symbol: 'LMNOA', nav: 12.04, change: 0.25, month: 4.6, quarter: 5.1, year: 5.3 },
    { name: 'Class B', symbol: 'LMNOB', nav: 12.14, change: 0.5, month: 4.6, quarter: 5.1, year: 5.3 }
  ],
  assets: [
    { name: 'Apple Inc', symbol: 'AAPL', percentage: 15.3, sector: 'informationTechnology' },
    { name: 'Microsoft Corp', symbol: 'MSFT', percentage: 14.2, sector: 'informationTechnology' },
    { name: 'Amazon.com Inc', symbol: 'AMZN', percentage: 12.1, sector: 'consumerDiscretionary' },
    { name: 'Meta Platforms Inc', symbol: 'META', percentage: 11.8, sector: 'communicationServices' },
    { name: 'Alphabet Inc', symbol: 'GOOG', percentage: 8.9, sector: 'communicationServices' },
    { name: 'Glacier Bancorp, Inc.', symbol: 'GBCI', percentage: 7.5, sector: 'financials' },
    { name: 'Johnson & Johnson', symbol: 'JNJ', percentage: 6.0, sector: 'healthCare' },
    { name: 'NVIDIA Corporation', symbol: 'NVDA', percentage: 6.3, sector: 'informationTechnology' },
    { name: 'Procter & Gamble Co', symbol: 'PG', percentage: 5.2, sector: 'consumerStaples' },
    { name: 'JPMorgan Chase & Co', symbol: 'JPM', percentage: 5.1, sector: 'financials' },
    { name: 'UnitedHealth Group Inc', symbol: 'UNH', percentage: 4.0, sector: 'healthCare' },
    { name: '3M Company', symbol: 'MMM', percentage: 3.6, sector: 'healthCare' }
  ]
}

interface IAggData {
  LMNOA: number
  LMNOB: number
  t: string
}

export const lmnoAggData: IAggData[] = [
  { LMNOA: 12.04, LMNOB: 12.14, t: '2024-01-31' },
  { LMNOA: 11.89, LMNOB: 11.52, t: '2024-01-30' },
  { LMNOA: 11.83, LMNOB: 11.93, t: '2024-01-29' },
  { LMNOA: 12.26, LMNOB: 12.16, t: '2024-01-28' },
  { LMNOA: 12.94, LMNOB: 12.14, t: '2024-01-27' },
  { LMNOA: 12.24, LMNOB: 12.34, t: '2024-01-26' },
  { LMNOA: 12.81, LMNOB: 12.21, t: '2024-01-25' },
  { LMNOA: 14.22, LMNOB: 12.22, t: '2024-01-24' },
  { LMNOA: 15.98, LMNOB: 10.98, t: '2024-01-23' },
  { LMNOA: 11.54, LMNOB: 11.54, t: '2024-01-22' },
  { LMNOA: 13.24, LMNOB: 12.14, t: '2024-01-21' },
  { LMNOA: 12.74, LMNOB: 12.54, t: '2024-01-20' }
]
