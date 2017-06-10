import React, { Component } from 'react'
import hold from 'react-hold'
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
        titleClass: 'height-50'
      })
    }, 4000)
  }

  changeTile = (e) => {
    const title = e.target.value
    this.setState({
      title,
      desc: title
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

const Img = hold((props) => !props.src, {
  holder: hold.Square,
  align: hold.RIGHT,
  children: <img src={logo} className="App-logo" alt="logo" style={{verticalAlign: 'middle'}}/>
})(({ src }) => {
  return <div className="App-header">{ src }</div>
})

const Avatar = hold((props) => !props.src, {
  holder: hold.Circle,
  children: ''
})(({ src, height }) => {
  return <img src={ src } style={{ height }}/>
})

const Text = hold((props) => !props.children, {
  holder: hold.Text
})(function ({ children }) {
  return <p>
    { children }
  </p>
})

const P = hold(
  (props) => !props.children,
  {
    holder: hold.Text
  })('p')
