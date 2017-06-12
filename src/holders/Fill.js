import React from 'react'
import PropTypes from 'prop-types'
import shapes from '../shapes'
import { CENTER } from '../align'

const Fill = ({ color, width, height, children, align = CENTER}) => {
  return <div style={{ textAlign: align }}>
    <div style={{
      display: 'inline-block',
      background: color,
      width: width,
      height: height,
      lineHeight: typeof height === 'number' ? `${height}px` : height,
      textAlign: 'center'
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
