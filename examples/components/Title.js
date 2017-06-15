/**
 * Created by toplan on 17/6/9.
 */
import React from 'react'
import { holdable } from 'react-hold'

const Title = ({ size, className, children }) => {
  size = Math.ceil(size)
  if (size < 1) size = 1
  if (size > 6) size = 6
  return React.createElement(`h${size}`, {
    className,
    children,
  })
}

Title.defaultProps = {
  size: 1,
}

const holdCondition = (props, prevProps) => !props.children

export const withHolderProps = (props = {}) => holdable(holdCondition, props)(Title)

export default withHolderProps()
