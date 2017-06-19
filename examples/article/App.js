import './style.css'
import React, { Component } from 'react'
import hold, { holdable, holders, align } from 'react-hold'
import { Div, H, Img, Span } from '$components'
import avatar from '../_img/github-toplan.png';

class App extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      title: '',
      author: {
        avatar: null,
        name: '',
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        author: {
          avatar,
          name: 'toplan',
        }
      })
    }, 3000)
  }

  render() {
    const state = this.state
    return (
      <div className="container">
        <h.Title>
          { state.title }
        </h.Title>
        <div className="author-info">
          <Img className="author-info_avatar" src={state.author.avatar}/>
          <Span className="author-info_name">
            { state.author.name }
          </Span>
        </div>
      </div>
    )
  }
}

export default App

/*
 * The holdable presentational components:
 */

const h = {
  Title: H.withHolder({ width: '60%' })
}
