import React from 'react'
import PropTypes from 'prop-types'
import shapes from '../shapes'

const $nbsp = '\u00A0'

const Text = ({ color, width, height, length, lineHeight, fontSize }) => (
  <div
    style={{
      background: 'transparent',
      overflow: 'hidden',
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
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

Text.defaultProps = {
  width: null,
  height: null,
  length: 100,
  lineHeight: 2.3,
  fontSize: '0.7em',
}

export default Text
