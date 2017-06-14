export const isNull = (value) => value === void 0 || value === null

export const isFunction = (value) => typeof value === 'function'

export const isObject = (value) => value !== null && Object.prototype.toString.call(value) === '[object Object]'

export const hasOwnProperty = (object, key) => Object.prototype.hasOwnProperty.call(object, key)

export const getComputedStyle = window.getComputedStyle || document.defaultView.getComputedStyle

export const getNodeSize = (node) => {
  if (isNull(node)) return null
  return {
    width: node.offsetWidth,
    height: node.offsetHeight
  }
}

export const getComponentName = (component) => {
  if (isNull(component)) return null
  return component.displayName
    || component.name
    || (typeof component === 'string' ? component : 'Unknown')
}

export const warn = (msg) => {
  if (isNull(msg)) {
    return
  }
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(msg)
  } else if(console) {
    console.warn('[react-hold]', msg)
  }
}
