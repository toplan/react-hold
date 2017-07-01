import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import hoistNonReactStatic from 'hoist-non-react-statics'
import {
  isNull, isObject, isFunction,
  getNodeSize, getComputedStyle, getDisplayName,
  addHandler, removeHandler,
} from './utils'
import Fill from './holders/Fill'
import createRefiter from './createRefiter'

const $nbsp = '\u00A0'
const blankLength = 10
const envDefaultStyle = {
  position: 'relative',
  padding: '0px',
  margin: '0px',
  width: '100%',
  height: '100%',
  border: 'none',
  overflow: 'visible',
}

/**
 * A higher-order component to create a Hold component as a manager
 * to manage the original component and placeholder component.
 *
 * If the condition is returns `true`, the placeholder component will be displayed.
 * Otherwise, the target(original) component will be displayed.
 *
 * @param {Component|String} targetComponent
 * @param {Function} condition
 * @param {Component} defaultHolder
 * @param {Object} holderDefaultProps
 * @returns {Component}
 */
export default function (targetComponent, condition,
  defaultHolder = Fill, holderDefaultProps = {}) {
  if (!isFunction(targetComponent) && typeof targetComponent !== 'string') {
    throw new TypeError('Expected the target component to be a string or class/function.')
  }

  if (!isFunction(condition)) {
    throw new TypeError('Expected the hold condition to be a function.')
  }

  if (isObject(defaultHolder)) {
    holderDefaultProps = defaultHolder
    defaultHolder = Fill
  }

  const targetComponentName = getDisplayName(targetComponent)

  const refiter = createRefiter(targetComponent)

  class Hold extends Component {
    constructor(...args) {
      super(...args)

      this.state = {
        hold: true,
        copy: true,
        holderAutoSize: {
          width: null,
          height: null,
        },
      }
      // The style of original node
      this.originNodeStyle = null
      // window resize handler
      this.resizeHandler = () => {
        if (this.state.hold) {
          this.updateHolderSizeIfNecessary()
        }
      }
      this.cancelHold = this.cancelHold.bind(this)
    }

    componentWillMount() {
      if (condition.call(null, this.props, {})) {
        refiter.refit()
      } else {
        this.cancelHold()
      }
    }

    componentDidMount() {
      if (this.state.hold) {
        this.originNodeStyle = this.computeOriginNodeStyle()
        this.setState({ copy: false })
      }

      addHandler(window, 'resize', this.resizeHandler)
    }

    componentWillReceiveProps(nextProps) {
      if (condition.call(null, nextProps, this.props)) {
        this.setState({
          hold: true,
          copy: true,
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
      removeHandler(window, 'resize', this.resizeHandler)
    }

    setFakeNodeStyle(style) {
      if (!isObject(style)) return

      const { fake, env } = this.refs
      const isInline = style.display && style.display.indexOf('inline') > -1

      // hidden element
      fake.style.display = 'none'
      // set style
      Object.keys(style).forEach((name) => {
        if (name !== 'display') {
          fake.style[name] = style[name]
        }
      })
      // fix fake style
      fake.style.opacity = 1
      fake.style.background = 'transparent'
      fake.style.borderColor = 'transparent'
      // fix env style
      if (isInline) {
        env.style.overflow = 'hidden'
      } else {
        env.style.overflow = 'visible'
      }
      // display fake
      fake.style.display = isInline ? 'inline-block' : style.display
    }

    computeOriginNodeStyle() {
      let result = null
      const originNode = findDOMNode(this)

      // store original display property
      let computedStyle = getComputedStyle(originNode, null)
      const originDisplay = computedStyle.getPropertyValue('display')

      // set display to 'none' before recompute is very **important**,
      // don't remove or move this step!
      originNode.style.display = 'none'
      // compute node style
      computedStyle = getComputedStyle(originNode, null)
      // copy style
      Object.keys(computedStyle).forEach((key) => {
        if (/[0-9]+/.test(key)) {
          const name = computedStyle[key]
          result = result || {}
          if (name === 'display') {
            result[name] = originDisplay
          } else {
            result[name] = computedStyle.getPropertyValue(name)
          }
        }
      })

      return result
    }

    cancelHold() {
      const { fake, env } = this.refs
      // manual restore fake and env node style,
      // because their style had been modified by method 'setFakeNodeStyle'
      if (fake) fake.removeAttribute('style')
      if (env) env.style.overflow = 'visible'
      // restore component lifecycle methods
      refiter.undo()
      // clear origin node style
      this.originNodeStyle = null
      // exit hold state
      this.setState({
        hold: false,
        copy: false,
      })
    }

    updateHolderSizeIfNecessary() {
      const { env } = this.refs
      if (!env) return

      const { holderAutoSize } = this.state
      const holderProps = this.props.holderProps || this.props.props || {}
      const customWidth = isNull(holderDefaultProps.width) ?
        holderProps.width : holderDefaultProps.width
      const customHeight = isNull(holderDefaultProps.height) ?
        holderProps.height : holderDefaultProps.height
      if (!isNull(customWidth) && !isNull(customHeight)) return

      const size = getNodeSize(env)
      const width = isNull(customWidth) ? size.width : null
      const height = isNull(customHeight) ? size.height : null
      if (holderAutoSize.width !== width || holderAutoSize.height !== height) {
        this.setState({
          holderAutoSize: {
            width,
            height,
          },
        })
      }
    }

    render() {
      const { hold, copy, holderAutoSize } = this.state
      const { innerRef, holder, holderProps, props, ...propsForElement } = this.props

      if (!hold || copy) {
        if (innerRef && !hold) propsForElement.ref = innerRef
        return React.createElement(targetComponent, propsForElement)
      }

      const propsForHolder = {
        color: '#eee',
        width: null,
        height: null,
        ...holderDefaultProps,
        ...props,
        ...holderProps,
        cancelHold: this.cancelHold,
        targetProps: propsForElement,
      }
      isNull(propsForHolder.width) && (propsForHolder.width = holderAutoSize.width)
      isNull(propsForHolder.height) && (propsForHolder.height = holderAutoSize.height)
      if (typeof propsForHolder.children === 'string') {
        propsForHolder.children = propsForHolder.children.replace(/ /g, $nbsp)
      }
      propsForHolder.children = propsForHolder.children || $nbsp.repeat(blankLength)

      return (
        <div ref="fake">
          <div ref="env" style={envDefaultStyle}>
            { React.createElement(holder, propsForHolder) }
          </div>
        </div>
      )
    }
  }

  hoistNonReactStatic(Hold, targetComponent)

  Hold.displayName = `Hold(${targetComponentName})`

  Hold.propTypes = {
    holder: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    holderProps: PropTypes.object,
    props: PropTypes.object, // The alias of 'holderProps'
    innerRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }

  Hold.defaultProps = {
    holder: defaultHolder,
    holderProps: null,
    props: null,
    innerRef: null,
  }

  return Hold
}
