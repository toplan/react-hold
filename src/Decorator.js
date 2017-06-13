import hold from './hold'

/**
 * The decorator make component holdable.
 *
 * @param {Function} condition
 * @param {Component} holder
 * @param {Object} holderProps
 * @returns {Function}
 */
export default function (condition, holder, holderProps) {
  return function (WrappedComponent) {
    return hold(WrappedComponent, condition, holder, holderProps)
  }
}
