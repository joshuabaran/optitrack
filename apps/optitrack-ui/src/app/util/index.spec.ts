import { getDeltaType } from './index'

describe('getDeltaType', () => {
  it('0 should be unchanged', () => {
    expect(getDeltaType(0)).toBe('unchanged')
  })

  it('0.1 should be moderateIncrease', () => {
    expect(getDeltaType(0.1)).toBe('moderateIncrease')
  })

  it('0.5 should be increase', () => {
    expect(getDeltaType(0.5)).toBe('increase')
  })

  it('-0.1 should be moderateDecrease', () => {
    expect(getDeltaType(-0.1)).toBe('moderateDecrease')
  })

  it('-0.5 should be decrease', () => {
    expect(getDeltaType(-0.5)).toBe('decrease')
  })

})