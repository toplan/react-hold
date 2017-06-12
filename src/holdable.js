import hold from './hold'

/**
 * The decorator make component holdable.
 *
 * @param condition
 * @param holder
 * @param holderProps
 * @returns {Function}
 */
export default function (condition, holder, holderProps) {
  return function (WrappedComponent) {
    return hold(WrappedComponent, condition, holder, holderProps)
  }
}
