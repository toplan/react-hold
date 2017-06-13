import React from 'react'
import PropTypes from 'prop-types'
import shapes from '../shapes'
import Square from './Square'

const Circle = ({ color, width, height, children, diameter, align }) => {
  return <Square color="transparent" width={ width } height={ height } side={ diameter } align={ align }>
      <div style={{
        background: color,
        width: '100%',
        height: '100%',
        borderRadius: '50%'
      }}>
        { children }
      </div>
    </Square>
}

Circle.propTypes = {
  ...shapes,
  diameter: Square.propTypes.side,
  align: PropTypes.string
}
export default Circle
