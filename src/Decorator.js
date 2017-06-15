import hold from './HOC'

/**
 * The decorator make component holdable.
 *
 * @param {Function} condition
 * @param {Component} holder
 * @param {Object} holderProps
 * @returns {Function}
 */
export default function (condition, holder, holderProps) {
  return function wrap(WrappedComponent) {
    return hold(WrappedComponent, condition, holder, holderProps)
  }
}
