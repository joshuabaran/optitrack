import { fundData } from '../../../data/fund'

export const getFund = async () => {
  await new Promise(resolve => setTimeout(resolve, 850))
  return fundData
}
