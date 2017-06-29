import PropTypes from 'prop-types'

export const color = PropTypes.string

export const width = PropTypes.number

export const height = PropTypes.number

export const cancelHold = PropTypes.func

export const targetProps = PropTypes.object

// This is a inner prop use to add more style to the filler which in holder.
export const fillerStyle = PropTypes.object

export default {
  color,
  width,
  height,
  cancelHold,
  targetProps,
  fillerStyle,
}
