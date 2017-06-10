/**
 * Created by toplan on 17/6/2.
 */
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { isNull, isFunction, getNodeSize, hasOwnProperty } from './utils'
import Fill from './holders/Fill'

export default function (condition, {
  holder = Fill,
  color = '#eee',
  width = null,
  height = null,
  ...otherProps
  } = {}) {
  if (!isFunction(condition)) {
    throw new TypeError('Expected the hold condition to be a function.')
  }

  return (WrappedComponent) => {
    if (!isFunction(WrappedComponent) && typeof WrappedComponent !== 'string') {
      throw new TypeError('Expected the wrapped component to be a react/dom component.')
    }

    const wrappedComponentName = WrappedComponent.displayName
      || WrappedComponent.name
      || (typeof WrappedComponent === 'string' ? WrappedComponent : 'Unknown')

    let wrappedComponentOriginalMethods = null

    const replaceWrappedComponentLifecycleMethods = () => {
      let componentDidMount, componentWillUnmount
      const prototype = WrappedComponent.prototype
      if (isNull(wrappedComponentOriginalMethods) && prototype) {
        if (isFunction(prototype.componentDidMount)) {
          componentDidMount = prototype.componentDidMount
          prototype.componentDidMount = null
        }
        if (isFunction(prototype.componentWillUnmount)) {
          componentWillUnmount = prototype.componentWillUnmount
          prototype.componentWillUnmount = function () {
            try {
              componentWillUnmount.call(this)
            } catch (e) {}
          }
        }
        wrappedComponentOriginalMethods = {
          componentDidMount,
          componentWillUnmount
        }
      }
    }

    const restoreWrappedComponentLifecycleMethods = () => {
      const methods = wrappedComponentOriginalMethods
      if (!isNull(methods) && WrappedComponent.prototype) {
        for (let name in methods) {
          if (hasOwnProperty(methods, name) && isFunction(methods[name])) {
            WrappedComponent.prototype[name] = methods[name]
          }
        }
        wrappedComponentOriginalMethods = null
      }
    }

    return class Hold extends Component {
      static displayName = `Hold(${ wrappedComponentName })`

      constructor(...args) {
        super(...args)

        this.state = {
          hold: true,
          copy: true,
          color, // holder's color
          width, // holder's width
          height // holder's height
        }
        this.originNodeStyle = null
        this.originNodeAttribues = null
      }

      componentWillMount() {
        if (condition.call(null, this.props)) {
          replaceWrappedComponentLifecycleMethods()
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
          replaceWrappedComponentLifecycleMethods()
          if (this.state.copy) {
            this.originNodeAttribues = this.getOriginNodeAttributes()
            this.originNodeStyle = this.computeOriginNodeStyle()
            this.setState({ copy: false })
          } else if (!isNull(this.originNodeStyle) || !isNull(this.originNodeAttribues)) {
            this.setFakeNodeAttributes(this.originNodeAttribues)
            this.setFakeNodeStyle(this.originNodeStyle)
            this.updateHolderSizeIfNecessary()
            this.originNodeAttribues = null
            this.originNodeStyle = null
          }
        }
      }

      componentWillUnmount() {
        window.removeEventListener('resize', this.updateHolderSizeIfNecessary)
      }

      cancelHold = () => {
        restoreWrappedComponentLifecycleMethods()
        this.setState({ hold: false })
      }

      getOriginNodeAttributes() {
        const result = {}
        const originNode = findDOMNode(this)
        const attributes = originNode.attributes
        let len = attributes.length, att
        while (len--) {
          att = attributes[len]
          result[att.name] = att.value
        }
        return result
      }

      computeOriginNodeStyle() {
        const originNode = findDOMNode(this)
        originNode.style.display = 'none'
        try {
          const style = getComputedStyle(originNode, '')
          return {
            margin: style.margin,
            padding: style.padding,
            border: style.border,
            width: style.width,
            height: style.height,
            fontSize: style.fontSize,
            lineHeight: style.lineHeight
          }
        } catch (e) {
        }
      }

      setFakeNodeAttributes(attributes) {
        const fake = this.refs.fake
        if (isNull(fake) || isNull(attributes)) return

        for (let name in attributes) {
          if (hasOwnProperty(attributes, name)) {
            if (typeof attributes[name] !== 'undefined') {
              fake.setAttribute(name, attributes[name])
            }
          }
        }
        fake.style.background = 'transparent'
      }

      setFakeNodeStyle(style) {
        if (isNull(style)) return

        const fake = this.refs.fake
        for (let name in style) {
          if (hasOwnProperty(style, name)) {
            const value = style[name]
            if (value) fake.style[name] = value
          }
        }
        fake.style.background = 'transparent'
      }

      updateHolderSizeIfNecessary = () => {
        const env = this.refs.env
        if (!env) return

        const size = getNodeSize(env)
        this.setState({
          width: isNull(width) ? size.width : width,
          height: isNull(height) ? size.height : height
        })
      }

      render() {
        const { hold, copy, color, width, height } = this.state
        if (!hold || copy) {
          return React.createElement(WrappedComponent, this.props)
        }
        const holderProps = { ...otherProps, color, width, height,
          children: otherProps.children || '\u00A0'
        }
        return <div ref="fake">
          <div ref="env" style={ envStyle }>
            { React.createElement(holder, holderProps) }
          </div>
        </div>
      }
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
