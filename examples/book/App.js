import React, { Component } from 'react'
import hold from 'react-hold'
import './style.css'

import Title from '$components/Title'

class App extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="container">
        <div className="content">
          <Title></Title>
        </div>
        <div className="recommended">

        </div>
      </div>
    )
  }
}

export default App
