import React, { Component } from 'react'
import hold, { holdable, holders, align } from 'react-hold'
import './style.css'
import logo from './logo.svg';

import Title from '$components/Title'
import Desc from '$components/Desc'

class App extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      title: '',
      titleClass: null,
      squareSide: null
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        titleClass: 'cool',
        squareSide: 50
      })
    }, 3000)
  }

  changeTile = (e) => {
    const title = e.target.value
    this.setState({
      title
    })
  }

  render() {
    return (
      <div className="container">
        <div className="content">
          <Title className={this.state.titleClass}>{this.state.title}</Title>
        </div>
        <div className="recommended">
        </div>

        <p>
          <input type="text" value={this.state.title} onChange={this.changeTile}/>
        </p>
        <div>
        <Title>{this.state.title}</Title>
        </div>
        <div>
          <Desc>{this.state.title}</Desc>
        </div>
        <div>
          <Img src={this.state.title} height={this.state.squareSide}/>
        </div>
        <div>
          <Avatar height={this.state.squareSide}/>
        </div>
        <div>
          <Text>{this.state.title}</Text>
        </div>
        <P style={{ padding: '10px 20px' }}>{this.state.title}</P>
      </div>
    )
  }
}

export default App

const Img = holdable((props) => !props.src, holders.Square, {
  align: align.RIGHT,
  children: <img src={logo} className="App-logo" alt="logo" style={{verticalAlign: 'middle'}}/>
})(({ src, height }) => {
  return <div style={{ height }}>{ src }</div>
})

const Avatar = holdable((props) => !props.src, holders.Circle)(({ src, height }) => {
  return <img src={ src } style={{ height }}/>
})

const Text = holdable((props) => !props.children, holders.Text)(({ children }) => {
  return <p>
    { children }
  </p>
})

const P = hold('p', (props) => !props.children, holders.Text, {
  length: 300
})
