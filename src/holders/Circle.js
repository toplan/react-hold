import React from 'react'
import Square from './Square'

const Circle = ({ color, width, height, children, align }) => {
  return <Square color="transparent" width={ width } height={ height } align={ align }>
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

Circle.propTypes = Square.propTypes

export default Circle
