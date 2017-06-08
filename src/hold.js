/**
 * Created by toplan on 17/6/2.
 */
import React, { Component } from 'react'
import { render, findDOMNode, unmountComponentAtNode } from 'react-dom'
import PropTypes from 'prop-types'

const wrapperDefaultStyle = {
  position: 'relative',
  padding: '0px',
  margin: '0px',
  width: '100%',
  height: '100%',
  border: 'none',
  overflow: 'hidden'
}

const getNodeSize = (node) => {
  return node && {
    width: node.offsetWidth,
    height: node.offsetHeight
  }
}

const isNull = (value) => value === void 0 || value === null

const isFunction = (value) => typeof value === 'function'

const Fill = ({ color, width, height, children, align = 'center'}) => {
  return <div style={{ textAlign: align }}>
    <div style={{
      display: 'inline-block',
      background: color,
      width: width,
      height: height,
      lineHeight: typeof height === 'number' ? `${height}px` : height,
      textAlign: 'center'
    }}>
      { children }
    </div>
  </div>
}

Fill.propTypes = {
  color: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  align: PropTypes.string
}

class Square extends Component {
  static propTypes = {
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    align: PropTypes.string
  }

  constructor(...args) {
    super(...args)

    this.state = {
      side: null
    }
  }

  componentWillMount() {
    this.updateSide(this.props.width, this.props.height)
  }

  componentWillReceiveProps(nextProps) {
    this.updateSide(nextProps.width, nextProps.height)
  }

  updateSide(width, height) {
    if (!isNull(width) && !isNull(height)) {
      this.setState({ side: width > height ? height : width })
    } else if (!isNull(width)) {
      this.setState({ side: width })
    } else if (!isNull(height)) {
      this.setState({ side: height })
    }
  }

  render() {
    const { color, children, align = 'center' } = this.props
    const { side } = this.state
    return <div style={{ textAlign: align }}>
      <div style={{
        display: 'inline-block',
        background: color,
        width: side,
        height: side,
        lineHeight: `${side}px`,
        textAlign: 'center'
      }}>
        { children }
      </div>
    </div>
  }
}

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

const Text = ({ color, length = 300, align = 'left', indent = 30, lineHeight = 2, fontSize }) => {
  return <div style={{
      background: 'transparent',
      textAlign: align,
      textIndent: indent,
      lineHeight,
      fontSize
    }}>
      <span style={{
        background: color,
        wordBreak: 'break-word',
        wordWrap: 'break-word'
      }}>
        { '\u00A0'.repeat(2 * length) }
      </span>
    </div>
}

Text.propTypes = {
  color: PropTypes.string,
  length: PropTypes.number,
  align: PropTypes.string,
  indent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

const hold = (
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
) => {
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
      || typeof WrappedComponent === 'string' ? WrappedComponent : 'Unknown'

    const checkRootNodeTagName = (name) => {
      if (name.toUpperCase() !== 'DIV') {
        warn(
          '[react-hold]',
          `Please make sure not to use the root tag's name('${name.toLowerCase()}') which in component '${wrappedComponentName}' as a selector in your css files.`,
          `If sure, please ignore this or setting 'warnings' to false.`
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
          if (methods.hasOwnProperty(name) && isFunction(methods[name])) {
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
      static displayName = `Hold(${wrappedComponentName})`

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
          if (attributes.hasOwnProperty(name)) {
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

// holders
hold.Fill = Fill
hold.Square = Square
hold.Circle = Circle
hold.Text = Text

// align constant
hold.LEFT = 'left'
hold.CENTER = 'center'
hold.RIGHT = 'right'

export default hold
