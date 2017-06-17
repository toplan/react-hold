import './style.css'
import React, { Component } from 'react'
import hold, { holdable, holders, align } from 'react-hold'
import Div from '$components/Div'
import H from '$components/H'

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

const Title = H.withHolder({ width: '40%' })
