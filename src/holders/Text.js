import React from 'react'
import PropTypes from 'prop-types'
import shapes from '../shapes'
import { LEFT } from '../align'

const $nbsp = '\u00A0'

const Text = ({ color, width, height, length, align, lineHeight, fontSize }) => (
  <div
    style={{
      background: 'transparent',
      overflow: 'hidden',
      textAlign: align,
      width,
      height,
      lineHeight,
      fontSize,
    }}
  >
    <span
      style={{
        background: color,
        wordBreak: 'break-word',
        wordWrap: 'break-word',
      }}
    >
      { `${$nbsp.repeat(2)}`.repeat(length) }
    </span>
  </div>
)

Text.propTypes = {
  ...shapes,
  length: PropTypes.number,
  align: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

Text.defaultProps = {
  width: null,
  height: null,
  length: 100,
  align: LEFT,
  lineHeight: 1.7,
  fontSize: null,
}

export default Text
