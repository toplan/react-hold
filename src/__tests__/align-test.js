import { LEFT, CENTER, RIGHT } from '../align'

describe('Align constants', () => {
  it('has LEFT', () => {
    expect(LEFT).toBe('left')
  })

  it('has CENTER', () => {
    expect(CENTER).toBe('center')
  })

  it('has CENTER', () => {
    expect(RIGHT).toBe('right')
  })
})
