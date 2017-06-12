/**
 * Created by toplan on 17/6/2.
 */
import React, { Component } from 'react'
import { holdable }from 'react-hold'

const style = {
  height: '30px',
  padding: '0 20px'
}

class Desc extends Component {
  constructor(...args) {
    super(...args)
  }

  componentWillMount() {
    console.log('Desc', 'will mount')
  }

  componentDidMount() {
    console.log('Desc', 'did mount')
  }

  componentWillUnmount() {
    console.log('Desc', 'will unmount')
  }

  render() {
    return <div id="title-1" className="title" style={ style }>{ this.props.children }</div>
  }
}

export default holdable((props) => !props.children, {
  width: '80%'
})(Desc)
