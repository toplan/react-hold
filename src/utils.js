/**
 * Created by toplan on 17/6/6.
 */
export const isNull = (value) => value === void 0 || value === null

export const isFunction = (value) => typeof value === 'function'

export const isObject = (value) => value !== null && Object.prototype.toString.call(value) === '[object Object]'

export const hasOwnProperty = (object, key) => Object.prototype.hasOwnProperty.call(object, key)

export const getComputedStyle = window.getComputedStyle || document.defaultView.getComputedStyle

export const getNodeSize = (node) => {
  return node && {
    width: node.offsetWidth,
    height: node.offsetHeight
  }
}
