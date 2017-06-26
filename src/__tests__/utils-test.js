import React from 'react'
import {
  isNull, isObject, isFunction, getDisplayName,
} from '../utils'


describe('utils', () => {
  it('isNull', () => {
    expect(isNull()).toBeTruthy()
    expect(isNull(null)).toBeTruthy()

    expect(isNull('')).toBeFalsy()
    expect(isNull(0)).toBeFalsy()
  })

  it('isObject', () => {
    expect(isObject()).toBeFalsy()
    expect(isObject(null)).toBeFalsy()
    expect(isObject('')).toBeFalsy()
    expect(isObject(0)).toBeFalsy()
    expect(isObject([])).toBeFalsy()

    expect(isObject({})).toBeTruthy()
    expect(isObject({ foo: 'bar' })).toBeTruthy()
  })

  it('isFunction', () => {
    expect(isFunction()).toBeFalsy()
    expect(isFunction({})).toBeFalsy()
    expect(isFunction([])).toBeFalsy()

    expect(isFunction(() => {})).toBeTruthy()
  })

  it('getDisplayName', () => {
    const Component1 = () => (
      <div>
        foo
      </div>
    )
    const Component2 = () => (
      <div>
        bar
      </div>
    )
    Component2.displayName = 'Bar'
    expect(getDisplayName(Component1)).toBe('Component1')
    expect(getDisplayName(Component2)).toBe('Bar')
    expect(getDisplayName('div')).toBe('div')
  })
})
