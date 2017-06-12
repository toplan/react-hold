/**
 * Created by toplan on 17/6/9.
 */
import React from 'react'
import { holdable } from 'react-hold'

const Title = function ({ size = 1, className, children }) {
  if (size < 1) size = 1
  if (size > 6) size = 6
  return React.createElement(`h${size}`, { className }, children)
}

export default holdable((props) => !props.children)(Title)
