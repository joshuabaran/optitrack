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
