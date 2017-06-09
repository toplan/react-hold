/**
 * Created by toplan on 17/6/2.
 */
import React, { Component } from 'react'
import { render, findDOMNode, unmountComponentAtNode } from 'react-dom'
import PropTypes from 'prop-types'
import { isNull, isFunction, getNodeSize, hasOwnProperty } from './utils'
import Fill from './holders/Fill'

export default function (
  condition,
  {
    holder = Fill,
    color = '#eee',
    width = null,
    height = null,
    ...otherProps
  } = {},
  {
    warnings = true
  } = {}
) {
  if (!isFunction(condition)) {
    throw new TypeError('Expected the hold condition to be a function.')
  }

  const warn = (...args) => {
    if (process.env.NODE_ENV !== 'production' && warnings) {
      try {
        console.warn(...args)
      } catch (e) {}
    }
  }

  return (WrappedComponent) => {
    if (!isFunction(WrappedComponent) && typeof WrappedComponent !== 'string') {
      throw new TypeError('Expected the wrapped component to be a react/dom component.')
    }

    const wrappedComponentName = WrappedComponent.displayName
      || WrappedComponent.name
      || (typeof WrappedComponent === 'string' ? WrappedComponent : 'Unknown')

    const checkRootNodeTagName = (name) => {
      if (name.toUpperCase() !== 'DIV') {
        warn(
          '[react-hold]',
          `Please make sure not to use the root tag's name('${ name.toLowerCase() }') which in component '${ wrappedComponentName }' as a selector in your css files.`,
          `If sure, ignore this warning, or setting 'warnings' to false.`
        )
      }
    }

    const getAndReplaceOriginLifecycleMethods = () => {
      let componentDidMount, componentWillUnmount
      const prototype = WrappedComponent.prototype
      if (prototype) {
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
      }
      return {
        componentDidMount,
        componentWillUnmount
      }
    }

    const restoreOriginLifecycleMethods = (methods) => {
      if (WrappedComponent.prototype) {
        for (let name in methods) {
          if (hasOwnProperty(methods, name) && isFunction(methods[name])) {
            WrappedComponent.prototype[name] = methods[name]
          }
        }
      }
    }

    const getRootNodeAttributes = (props) => {
      const result = {}
      const container = document.createElement('div')

      // replace origin lifecycle methods
      const methods = getAndReplaceOriginLifecycleMethods()
      // render component
      const element = React.createElement(WrappedComponent, props)
      const inst = render(<div>{ element }</div>, container)
      const node = findDOMNode(inst).firstChild
      unmountComponentAtNode(container)
      // restore origin lifecycle methods
      restoreOriginLifecycleMethods(methods)
      // check tag name
      checkRootNodeTagName(node.tagName)

      const attributes = node.attributes
      let len = attributes.length, att
      while (len--) {
        att = attributes[len]
        result[att.name] = att.value
      }
      return result
    }

    return class Hold extends Component {
      static displayName = `Hold(${ wrappedComponentName })`

      constructor(...args) {
        super(...args)

        this.state = {
          hold: true,
          color, // holder's color
          width, // holder's width
          height // holder's height
        }
      }

      componentWillMount() {
        if (!condition.call(null, this.props)) {
          this.cancelHold()
        }
      }

      componentDidMount() {
        this.setEnvNodeAttributes(getRootNodeAttributes(this.props))
        this.updateHolderSizeIfNecessary()
        // async fix size because holder **may** received wrong width
        setTimeout(this.updateHolderSizeIfNecessary, 100)
        window.addEventListener('resize', this.updateHolderSizeIfNecessary)
      }

      componentWillReceiveProps(nextProps) {
        if (condition.call(null, nextProps)) {
          this.setState({
            hold: true
          }, () => {
            this.setEnvNodeAttributes(getRootNodeAttributes(nextProps))
            this.updateHolderSizeIfNecessary()
          })
        } else {
          this.cancelHold()
        }
      }

      componentWillUnmount() {
        window.removeEventListener('resize', this.updateHolderSizeIfNecessary)
      }

      cancelHold = () => {
        this.setState({ hold: false })
      }

      setEnvNodeAttributes(attributes) {
        const envDom = this.refs.env
        if (!envDom || !attributes) return

        for (let name in attributes) {
          if (hasOwnProperty(attributes, name)) {
            if (typeof attributes[name] !== 'undefined') {
              envDom.setAttribute(name, attributes[name])
            }
          }
        }
        envDom.style.background = 'transparent'
      }

      updateHolderSizeIfNecessary = () => {
        const wrapper = this.refs.wrapper
        if (!wrapper) return

        const size = getNodeSize(wrapper)
        this.setState({
          width: isNull(width) ? size.width : width,
          height: isNull(height) ? size.height : height
        })
      }

      render() {
        const { hold, color, width, height } = this.state
        if (!hold) {
          return React.createElement(WrappedComponent, this.props)
        }
        const holderProps = { ...otherProps, color, width, height,
          children: otherProps.children || '\u00A0'
        }
        return <div ref="env">
          <div ref="wrapper" style={ wrapperDefaultStyle }>
            { React.createElement(holder, holderProps) }
          </div>
        </div>
      }
    }
  }
}

const wrapperDefaultStyle = {
  position: 'relative',
  padding: '0px',
  margin: '0px',
  width: '100%',
  height: '100%',
  border: 'none',
  overflow: 'hidden'
}
