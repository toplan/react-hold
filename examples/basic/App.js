import './style.css'
import React, { Component } from 'react'
import hold, { holders, align } from 'react-hold'
import { Div, H, Img, P } from '$components'
import logo from '../_img/github-toplan.png';

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
    }, 4000)
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
          <Div className="circle"></Div>
        </section>

        <section>
          <H className={this.state.className}>
            { this.state.title }
          </H>
        </section>

        <section>
          <Div>
            { this.state.title }
          </Div>
        </section>

        <h3>Square</h3>
        <section style={{textAlign: 'center'}}>
          <img.Square src={this.state.src} width={80} height={80}/>
        </section>

        <h3>Circle</h3>
        <section>
          <div.InnerCircle style={{height:this.state.height, minHeight: 40}}/>
        </section>

        <h3>Text</h3>
        <section>
          <p.Text style={{textIndent: 30, fontSize: 20}}>
            { this.state.title }
          </p.Text>
          <p.TextLen300 style={{padding: '5px 0'}}>
            { this.state.title }
          </p.TextLen300>
        </section>

        <h3>Table</h3>
        <section>
          <div.Table4x2 style={{height:80}}/>
        </section>

      </div>
    )
  }
}

export default App


/*
 * The holdable presentational components:
 */
const img = {
  Square: Img.withHolder(holders.Square, { children: 'loading...' }),
}

const p = {
  Text: P.withHolder(holders.Text),
  TextLen300: P.withHolder(holders.Text, { length: 300 }),
}

const div = {
  InnerCircle: Div.withHolder(holders.Circle),
  Table4x2: Div.withHolder(holders.Table, {
    cols: 4,
    rows: 2,
  })
}
