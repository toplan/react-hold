import React from 'react'
import PropTypes from 'prop-types'
import shapes from '../shapes'
import { CENTER } from '../align'
import { warn } from '../utils'

const COLS = 2
const ROWS = 2
const GAP = 2
const $nbsp = '\u00A0'
const blankLength = 10

const computeCellSide = (total, number, gap) => {
  if (total <= 0) return 0
  const gapNumber = number === 1 ? 0 : number - 1
  let rest = total - (gapNumber * gap)
  if (rest <= 0) {
    warn(`Expected option gap lower than ${total / gapNumber}, current ${gap}. Default ${GAP}.`)
    rest = 0
  }
  return rest / number
}

const Table = ({ color, width, height, children, cols, rows, gap, align }) => {
  cols = Math.ceil(cols)
  rows = Math.ceil(rows)

  if (cols < 1) throw new TypeError('Expected option cols greater than 0.')
  if (rows < 1) throw new TypeError('Expected option rows greater than 0.')

  const cellWidth = computeCellSide(width, cols, gap)
  const cellHeight = computeCellSide(height, rows, gap)
  const cells = []

  if (cellWidth && cellHeight) {
    for (let i = 0; i < cols; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        cells.push(
          <div
            key={`${i}-${j}`}
            style={{
              position: 'absolute',
              top: j * (cellHeight + gap),
              left: i * (cellWidth + gap),
              background: color,
              width: cellWidth,
              height: cellHeight,
              lineHeight: `${cellHeight}px`,
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            { children }
          </div>)
      }
    }
  }

  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          background: 'transparent',
          width,
          height,
        }}
      >
        { $nbsp.repeat(blankLength) }
        { cells }
      </div>
    </div>
  )
}

Table.propTypes = {
  ...shapes,
  cols: PropTypes.number,
  rows: PropTypes.number,
  gap: PropTypes.number,
  align: PropTypes.string,
}

Table.defaultProps = {
  width: null,
  height: null,
  cols: COLS,
  rows: ROWS,
  gap: GAP,
  align: CENTER,
}

export default Table
