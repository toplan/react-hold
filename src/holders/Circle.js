import React from 'react'
import PropTypes from 'prop-types'
import shapes from '../shapes'
import Square from './Square'
import { CENTER } from '../align'

const Circle = ({ color, width, height, children, diameter, align, fillerStyle }) => (
  <Square color="transparent" width={width} height={height} side={diameter} align={align}>
    <div
      style={{
        background: color,
        ...fillerStyle,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
      }}
    >
      { children }
    </div>
  </Square>
)

Circle.propTypes = {
  ...shapes,
  diameter: Square.propTypes.side,
  align: PropTypes.string,
}

Circle.defaultProps = {
  width: null,
  height: null,
  diameter: null,
  align: CENTER,
  fillerStyle: null,
}

export default Circle
