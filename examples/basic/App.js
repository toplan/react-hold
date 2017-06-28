import './style.css'
import React, { Component } from 'react'
import hold, { holders, align } from 'react-hold'
import { Div, H, Img, P } from '$components'
import image from '../_img/github-toplan.png';

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
          height: 80,
          src: image,
        })
      }
    }, 5000)
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
          <Div className="square"></Div>
          <Img props={{children: 'loading...'}} src={this.state.src} width={80} height={80}/>
          <br/>
          <H className={this.state.className}>
            { this.state.title }
          </H>
          <br/>
          <Div>
            { this.state.title }
          </Div>
        </section>

        <h3>Square</h3>
        <section style={{textAlign: 'center'}}>
          <Div holder={holders.Square} style={{height:this.state.height}}></Div>
        </section>

        <h3>Circle</h3>
        <section style={{textAlign: 'center'}}>
          <Div holder={holders.Circle} style={{height:this.state.height}}></Div>
          <br/>
          <Div holder={holders.Circle} className="circle"></Div>
          <br/>
          <br/>
          <Img holder={holders.Circle} props={{children: 'loading...'}} src={this.state.src} width={80} height={80}/>
        </section>

        <h3>Text</h3>
        <section>
          <P holder={holders.Text} style={{textIndent: 30, fontSize: 20}}>
            { this.state.title }
          </P>
          <P holder={holders.Text} props={{length: 300}} style={{padding: '5px 0'}}>
            { this.state.title }
          </P>
        </section>

        <h3>Table</h3>
        <section>
          <Div holder={holders.Table} props={{cols: 4, rows: 2}} style={{height:80}}></Div>
        </section>

      </div>
    )
  }
}

export default App
