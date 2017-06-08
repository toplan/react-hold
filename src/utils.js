/**
 * Created by toplan on 17/6/6.
 */
export const getNodeSize = (node) => {
  return node && {
    width: node.offsetWidth,
    height: node.offsetHeight
  }
}

export const isNull = (value) => value === void 0 || value === null

export const isFunction = (value) => typeof value === 'function'
