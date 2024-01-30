// decrease, moderateDecrease, unchanged, moderateIncrease, increase

export const getDeltaType = (delta: number) => {
  const moderateDelta = 0.5
  const significantDelta = 1

  switch (true) {
    case delta < -significantDelta:
      return 'decrease'
    case delta < -moderateDelta:
      return 'moderateDecrease'
    case delta < moderateDelta:
      return 'increase'
    case delta < significantDelta:
      return 'moderateIncrease'
    default:
      return 'unchanged'
  }
}