import React from 'react'
import PropTypes from 'prop-types'
import { LEFT } from '../align'

const $nbsp = '\u00A0'

const Text = ({ color, length, align, indent, lineHeight, fontSize }) => (
  <div
    style={{
      background: 'transparent',
      textAlign: align,
      textIndent: indent,
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
  color: PropTypes.string.isRequired,
  length: PropTypes.number,
  align: PropTypes.string,
  indent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

Text.defaultProps = {
  length: 100,
  align: LEFT,
  indent: 30,
  lineHeight: 1.7,
  fontSize: null,
}

export default Text
