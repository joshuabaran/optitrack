import { fundData } from '../../../data/fund'

export const getFund = async () => {
  await new Promise(resolve => setTimeout(resolve, 3500))
  return fundData
}
