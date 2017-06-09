/**
 * Created by toplan on 17/6/6.
 */
export const isNull = (value) => value === void 0 || value === null

export const isFunction = (value) => typeof value === 'function'

export const hasOwnProperty = (object, key) => Object.prototype.hasOwnProperty.call(object, key)

export const getNodeSize = (node) => {
  return node && {
    width: node.offsetWidth,
    height: node.offsetHeight
  }
}
