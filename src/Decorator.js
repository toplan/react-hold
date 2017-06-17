import Hoc from './HoC'

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
    return Hoc(WrappedComponent, condition, holder, holderProps)
  }
}
