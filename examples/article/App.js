import './style.css'
import React, { Component } from 'react'
import hold, { holdable, holders, align } from 'react-hold'
import { withHolderProps } from '$components/Title'
import Div from '$components/Div'

const Title = withHolderProps({ width: '40%' })

class App extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      title: ''
    }
  }

  render() {
    return (
      <div className="container">
        <Title>
          { this.state.title }
        </Title>
      </div>
    )
  }
}

export default App
