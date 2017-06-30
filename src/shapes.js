import PropTypes from 'prop-types'

/*
 | All of the prop types in this file is belongs to placeholder component.
 */

export const color = PropTypes.string

export const width = PropTypes.number

export const height = PropTypes.number

export const cancelHold = PropTypes.func

export const targetProps = PropTypes.object

// This is a inner prop use to add more custom style to the placeholder.
export const fillerStyle = PropTypes.object

export default {
  color,
  width,
  height,
  cancelHold,
  targetProps,
  fillerStyle,
}
