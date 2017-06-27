import { isNull, isFunction } from './utils'

export const symbol = Symbol ? Symbol('react-hold/refiter') : '$$react-hold/refiter'

/**
 * Create APIs to refit the component lifecycle methods.
 *
 * @param {Component|string} component
 * @returns {{refit, undo}}
 */
export default function (component) {
  if (component[symbol]) return component[symbol]

  let componentOriginalMethods = null

  const replaceLifecycleMethods = () => {
    let componentDidMount
    let componentWillUnmount
    const prototype = component.prototype
    if (isNull(componentOriginalMethods) && prototype) {
      if (isFunction(prototype.componentDidMount)) {
        componentDidMount = prototype.componentDidMount
        prototype.componentDidMount = null
      }
      if (isFunction(prototype.componentWillUnmount)) {
        componentWillUnmount = prototype.componentWillUnmount
        prototype.componentWillUnmount = function willUnmount() {
          try {
            componentWillUnmount.call(this)
          } catch (e) {
            // swallow exception
          }
        }
      }
      componentOriginalMethods = {
        componentDidMount,
        componentWillUnmount,
      }
    }
  }

  const restoreLifecycleMethods = () => {
    const methods = componentOriginalMethods
    if (!isNull(methods) && component.prototype) {
      Object.keys(methods).forEach((name) => {
        if (isFunction(methods[name])) {
          component.prototype[name] = methods[name]
        }
      })
      componentOriginalMethods = null
    }
  }

  const refiter = {
    refit: replaceLifecycleMethods,
    undo: restoreLifecycleMethods,
  }

  if (typeof component !== 'string') {
    component[symbol] = refiter
  }

  return refiter
}
