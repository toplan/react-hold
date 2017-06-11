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
        restoreWrappedComponentLifecycleMethods()
        this.setState({ hold: false })
      }

      computeOriginNodeStyle() {
        let result = null
        const originNode = findDOMNode(this)
        // set 'display' to 'none' before get computed style is very **important**
        // don't remove or move this step!
        originNode.style.display = 'none'

        const computedStyle = window.getComputedStyle(originNode, null)
        for (let key in computedStyle) {
          if (/[0-9]+/.test(key)) {
            const name = computedStyle[key]
            if (name === 'display') continue
            result = result || {}
            result[name] = computedStyle.getPropertyValue(name)
          }
        }
        return result
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

        // fix background and border color!
        fake.style.background = 'transparent'
        fake.style.borderColor = 'transparent'
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
