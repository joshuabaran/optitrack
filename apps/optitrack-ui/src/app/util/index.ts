import {
  BoltIcon,
  BeakerIcon,
  PaperAirplaneIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  HeartIcon,
  CreditCardIcon,
  CpuChipIcon,
  PhoneIcon,
  CircleStackIcon,
  HomeModernIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/solid'

const sectorMeta = [
  { key: 'energy', name: 'Energy', color: 'red', Icon: BoltIcon },
  { key: 'materials', name: 'Materials', color: 'green', Icon: BeakerIcon },
  { key: 'industrials', name: 'Industrials', color: 'blue', Icon: PaperAirplaneIcon },
  { key: 'consumerDiscretionary', name: 'Consumer Discretionary', color: 'yellow', Icon: ShoppingBagIcon },
  { key: 'consumerStaples', name: 'Consumer Staples', color: 'cyan', Icon: ShoppingCartIcon },
  { key: 'healthCare', name: 'Health Care', color: 'pink', Icon: HeartIcon },
  { key: 'financials', name: 'Financials', color: 'orange', Icon: CreditCardIcon },
  { key: 'informationTechnology', name: 'Information Technology', color: 'purple', Icon: CpuChipIcon },
  { key: 'communicationServices', name: 'Communication Services', color: 'emerald', Icon: PhoneIcon },
  { key: 'utilities', name: 'Utilities', color: 'amber', Icon: CircleStackIcon },
  { key: 'realEstate', name: 'Real Estate', color: 'teal', Icon: HomeModernIcon },
  { key: 'unknown', name: 'Unknown', color: 'black', Icon: ExclamationCircleIcon }
]

export const getSectorMetaByKey = (sector: string) => {
  const meta = sectorMeta.find(s => s.key === sector)
  return meta || sectorMeta[sectorMeta.length - 1]
}

export const getSectorMetaByName = (sector: string) => {
  const meta = sectorMeta.find(s => s.name === sector)
  return meta || sectorMeta[sectorMeta.length - 1]
}

export const getDeltaType = (delta: number) => {
  const moderateDelta = 0.1
  const significantDelta = 0.5

  switch (true) {
    case delta <= -significantDelta:
      return 'decrease'
    case delta <= -moderateDelta:
      return 'moderateDecrease'
    case delta < moderateDelta:
      return 'unchanged' 
    case delta < significantDelta:
      return 'moderateIncrease'
    default:
      return 'increase'
  }
}
