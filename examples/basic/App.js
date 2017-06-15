import './style.css'
import React, { Component } from 'react'
import hold, { holdable, holders, align } from 'react-hold'
import Title from '$components/Title'
import Div from '$components/Div'
import logo from '../logo.svg';

class App extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      title: '',
      className: null,
      height: null,
      src: null,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (confirm('Can I update the states?')) {
        this.setState({
          className: 'change-style-to',
          height: 50,
          src: logo,
        })
      }
    }, 2000)
  }

  changeTile = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  render() {
    return (
      <div className="container">

        <section>
          <input type="text" value={this.state.title} onChange={this.changeTile}/>
        </section>

        <h3>Fill</h3>
        <section>
          <Circle/>
        </section>

        <section>
          <Title className={this.state.className}>
            { this.state.title }
          </Title>
        </section>

        <section>
          <Div>
            { this.state.title }
          </Div>
        </section>

        <h3>Square</h3>
        <section style={{textAlign: 'center'}}>
          <Img src={this.state.src} width={90} height={90}/>
        </section>

        <h3>Circle</h3>
        <section>
          <InnerCircle height={this.state.height}/>
        </section>

        <h3>Text</h3>
        <section>
          <Text>
            { this.state.title }
          </Text>
          <P style={{padding: '5px 0'}}>
            { this.state.title }
          </P>
        </section>

        <h3>Table</h3>
        <section>
          <Table height={80}/>
        </section>

      </div>
    )
  }
}

export default App

// holdable presentational components:

const Circle = hold(
  () => <div className="circle"></div>,
  () => true
)

const Img = holdable(
  (props) => !props.src,
  holders.Square,
  {
    children: 'loading...'
  }
)(({ src, width, height }) => {
  return <img src={ src } style={{ width, height }}/>
})

const InnerCircle = holdable(
  (props) => true,
  holders.Circle
)(({ height }) => {
  return <div style={{ height }}></div>
})

const Text = holdable(
  (props) => !props.children,
  holders.Text
)(({ children }) => {
  return (
    <p style={{textIndent: 30}}>
      { children }
    </p>
  )
})

const P = hold(
  'p',
  (props) => !props.children,
  holders.Text,
  {
    length: 300
  }
)

const Table = hold(
  ({ height }) => <div style={{ height }}></div>,
  () => true,
  holders.Table,
  {
    width: 300,
    cols: 3
  }
)
