import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shapes from '../shapes'
import { CENTER } from '../align'
import { isNull } from '../utils'

const Square = ({ color, width, height, align = CENTER, children }) => {
  let side = null

  if (!isNull(width) && !isNull(height)) {
    side = width > height ? height : width
  } else if (!isNull(width)) {
    side = width
  } else if (!isNull(height)) {
    side = height
  }

  return <div style={{ textAlign: align }}>
    <div style={{
      display: 'inline-block',
      background: color,
      width: side,
      height: side,
      lineHeight: `${side}px`,
      textAlign: 'center'
    }}>
      { children }
    </div>
  </div>
}

Square.propTypes = {
  ...shapes,
  align: PropTypes.string
}

export default Square
