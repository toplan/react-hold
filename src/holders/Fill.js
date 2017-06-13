import React from 'react'
import PropTypes from 'prop-types'
import shapes from '../shapes'
import { CENTER } from '../align'

const Fill = ({ color, width, height, children, align = CENTER }) => {
  const lineHeight = (typeof height === 'string' && height.trim()) ?
    height : typeof height === 'string' ?
    `${height}px` : null

  return <div style={{ textAlign: align }}>
    <div style={{
      display: 'inline-block',
      background: color,
      width: width,
      height: height,
      textAlign: 'center',
      lineHeight
    }}>
      { children }
    </div>
  </div>
}

Fill.propTypes = {
  ...shapes,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  align: PropTypes.string
}

export default Fill
