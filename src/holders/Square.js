/**
 * Created by toplan on 17/6/9.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isNull } from '../utils'
import { CENTER } from '../align'

export default class Square extends Component {
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
    const { color, children, align = CENTER } = this.props
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
