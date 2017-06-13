import React from 'react'
import PropTypes from 'prop-types'
import shapes from '../shapes'
import { CENTER } from '../align'
import { isNull } from '../utils'

const Square = ({ color, width, height, children, side, align = CENTER }) => {
  if (isNull(side)) {
    if (!isNull(width) && !isNull(height)) {
      side = width > height ? height : width
    } else if (!isNull(width)) {
      side = width
    } else if (!isNull(height)) {
      side = height
    }
  }
  const lineHeight = (typeof side === 'string' && side.trim()) ?
    side : isNull(side) ?
    null : `${side}px`

  return <div style={{ textAlign: align }}>
    <div style={{
      display: 'inline-block',
      background: color,
      width: side,
      height: side,
      lineHeight,
      textAlign: 'center'
    }}>
      { children }
    </div>
  </div>
}

Square.propTypes = {
  ...shapes,
  side: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  align: PropTypes.string
}

export default Square
