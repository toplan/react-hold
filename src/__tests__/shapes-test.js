import PropTypes from 'prop-types'
import { color, width, height, cancelHold, targetProps } from '../shapes'

describe("Holder's default prop types", () => {
  it('has "color" type', () => {
    expect(color).toBe(PropTypes.string)
  })

  it('has "width" type', () => {
    expect(width).toBe(PropTypes.number)
  })

  it('has "height" type', () => {
    expect(height).toBe(PropTypes.number)
  })

  it('has "cancelHold" type', () => {
    expect(cancelHold).toBe(PropTypes.func)
  })

  it('has "targetProps" type', () => {
    expect(targetProps).toBe(PropTypes.object)
  })
})
