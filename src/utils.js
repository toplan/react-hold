const window = global
const document = window.document

export const isNull = value => value === undefined || value === null

export const isFunction = value => typeof value === 'function'

export const isObject = value => value !== null && Object.prototype.toString.call(value) === '[object Object]'

export const getComputedStyle = window.getComputedStyle || document.defaultView.getComputedStyle

export const getNodeSize = (node) => {
  if (isNull(node)) return null
  return {
    width: node.offsetWidth,
    height: node.offsetHeight,
  }
}

export const getDisplayName = (component) => {
  if (isNull(component)) return null
  return component.displayName
    || component.name
    || (typeof component === 'string' ? component : 'Unknown')
}

export const addHandler = window.addEventListener ?
  (target, type, handler) => {
    target.addEventListener(type, handler, false)
  } :
  (target, type, handler) => {
    target.attachEvent(`on${type}`, handler)
  }

export const removeHandler = window.removeEventListener ?
  (target, type, handler) => {
    target.removeEventListener(type, handler, false)
  } :
  (target, type, handler) => {
    target.detachEvent(`on${type}`, handler)
  }

export const warn = (msg) => {
  if (isNull(msg)) return
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(msg)
  } else if (console) {
    console.warn('[react-hold]', msg)
  }
}
