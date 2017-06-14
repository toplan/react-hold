import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { isNull, isObject, isFunction, hasOwnProperty, getNodeSize, getComputedStyle, getComponentName, warn } from './utils'
import Fill from './holders/Fill'
import createRefiter from './createRefiter'
const $nbsp = '\u00A0'

/**
 * Hold the target component,
 * returns a holdable higher-order component.
 *
 * @param {Component} targetComponent
 * @param {Function} condition
 * @param {Component} holder
 * @param {Object} holderProps
 * @returns {Component}
 */
export default function (
  targetComponent,
  condition,
  holder = Fill,
  holderProps = {}
) {
  if (!isFunction(targetComponent) && typeof targetComponent !== 'string') {
    throw new TypeError('Expected the target component to be a react or dom component.')
  }

  if (!isFunction(condition)) {
    throw new TypeError('Expected the hold condition to be a function.')
  }

  if (isObject(holder)) {
    holderProps = holder
    holder = Fill
  }

  holderProps.color = holderProps.color || '#eee'
  holderProps.width = !isNull(holderProps.width) ? holderProps.width : null
  holderProps.height = !isNull(holderProps.height) ? holderProps.height : null

  const wrappedComponentName = getComponentName(targetComponent)

  const refiter = createRefiter(targetComponent)

  return class Hold extends Component {
    static displayName = `Hold(${ wrappedComponentName })`

    constructor(...args) {
      super(...args)

      this.state = {
        hold: true,
        copy: true,
        color: holderProps.color, // holder's color
        width: holderProps.width, // holder's width
        height: holderProps.height // holder's height
      }
      // The style value of original node
      this.originNodeStyle = null
    }

    componentWillMount() {
      if (condition.call(null, this.props)) {
        refiter.refit()
      } else {
        this.cancelHold()
      }
    }

    componentDidMount() {
      this.originNodeStyle = this.computeOriginNodeStyle()
      this.setState({ copy: false })

      window.addEventListener('resize', this.updateHolderSizeIfNecessary)
    }

    componentWillReceiveProps(nextProps) {
      if (condition.call(null, nextProps)) {
        this.setState({
          hold: true,
          copy: true
        })
      } else {
        this.cancelHold()
      }
    }

    componentDidUpdate() {
      if (this.state.hold) {
        if (this.state.copy) {
          refiter.refit()
          this.originNodeStyle = this.computeOriginNodeStyle()
          this.setState({ copy: false })
        } else if (!isNull(this.originNodeStyle)) {
          this.setFakeNodeStyle(this.originNodeStyle)
          this.updateHolderSizeIfNecessary()
          this.originNodeStyle = null
        }
      }
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateHolderSizeIfNecessary)
    }

    cancelHold = () => {
      refiter.undo()
      this.setState({ hold: false })
    }

    computeOriginNodeStyle() {
      let result = null
      const originNode = findDOMNode(this)

      // compute original 'display' and 'position' property
      let computedStyle = getComputedStyle(originNode, null)
      const originDisplay = computedStyle.getPropertyValue('display')
      const position = computedStyle.getPropertyValue('position')

      // if position is 'absolute' or 'fixed',
      // check the width and height of original node,
      // otherwise recompute the style of original node.
      if (position === 'absolute' || position === 'fixed') {
        const width = computedStyle.getPropertyValue('width')
        const height = computedStyle.getPropertyValue('height')
        if (height === '0px' && isNull(holderProps.height)) {
          warn(`The holder(${ getComponentName(holder) }) of component(${ wrappedComponentName }) expected the height props.`)
        }
        if (width === '0px' && isNull(holderProps.width)) {
          warn(`The holder(${ getComponentName(holder) }) of component(${ wrappedComponentName }) expected the width props.`)
        }
      } else {
        // set display to 'none' before recompute is very **important**,
        // don't remove or move this step!
        originNode.style.display = 'none'
        // compute node style
        computedStyle = getComputedStyle(originNode, null)
      }

      for (let key in computedStyle) {
        if (/[0-9]+/.test(key)) {
          const name = computedStyle[key]
          result = result || {}
          if (name === 'display') {
            result[name] = originDisplay
          } else {
            result[name] = computedStyle.getPropertyValue(name)
          }
        }
      }

      return result
    }

    setFakeNodeStyle(style) {
      if (!isObject(style)) return

      const fake = this.refs.fake
      // hidden element
      fake.style.display = 'none'
      // set style
      for (let name in style) {
        if (hasOwnProperty(style, name) && name !== 'display') {
          fake.style[name] = style[name]
        }
      }
      // fix style
      fake.style.opacity = 1
      fake.style.background = 'transparent'
      fake.style.borderColor = 'transparent'
      let display = style.display
      if (display === 'inline') display = 'inline-block'
      fake.style.display = display
    }

    updateHolderSizeIfNecessary = () => {
      const { env } = this.refs
      if (!env) return

      const size = getNodeSize(env)
      this.setState({
        width: isNull(holderProps.width) ? size.width : holderProps.width,
        height: isNull(holderProps.height) ? size.height : holderProps.height
      })
    }

    render() {
      const { hold, copy, color, width, height } = this.state
      if (!hold || copy) {
        return React.createElement(targetComponent, this.props)
      }
      const props = { ...holderProps, color, width, height }
      if (typeof props.children === 'string') {
        props.children = props.children.trim()
      }
      props.children = props.children || $nbsp

      return <div ref="fake">
        <div ref="env" style={ envStyle }>
          { React.createElement(holder, props) }
        </div>
      </div>
    }
  }
}

const envStyle = {
  position: 'relative',
  padding: '0px',
  margin: '0px',
  width: '100%',
  height: '100%',
  border: 'none',
  overflow: 'visible'
}
