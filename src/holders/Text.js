import React from 'react'
import PropTypes from 'prop-types'
import shapes from '../shapes'
import { LEFT } from '../align'

const Text = ({ color, length = 100, align = LEFT, indent = 30, lineHeight = 1.7, fontSize }) => {
  return <div style={{
      background: 'transparent',
      textAlign: align,
      textIndent: indent,
      lineHeight,
      fontSize
    }}>
      <span style={{
        background: color,
        wordBreak: 'break-word',
        wordWrap: 'break-word'
      }}>
        { '\u00A0'.repeat(2 * length) }
      </span>
    </div>
}

Text.propTypes = {
  color: shapes.color,
  length: PropTypes.number,
  align: PropTypes.string,
  indent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default Text
