import HoC from './HoC'

/**
 * A decorator make component has a placeholder.
 *
 * @param {Function} condition
 * @param {Component} holder
 * @param {Object} holderProps
 * @returns {Function}
 */
export default function (condition, holder, holderProps) {
  return function wrap(WrappedComponent) {
    return HoC(WrappedComponent, condition, holder, holderProps)
  }
}
