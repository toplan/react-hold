/**
 * Created by toplan on 17/6/2.
 */
import React, { Component } from 'react'
import { holdable, align } from 'react-hold'

const style = {
  height: '30px'
}

@holdable(
  (props) => !props.children,
  {
    align: align.LEFT,
    width: '80%'
  }
)
export default class Desc extends Component {
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
    return <div className="desc" style={ style }>{ this.props.children }</div>
  }
}
