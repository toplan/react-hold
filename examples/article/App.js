import './style.css'
import React, { Component } from 'react'
import hold, { holdable, holders, align } from 'react-hold'
import { H, Img, P, Span } from '$components'

class App extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      title: '',
      author: {
        avatar: null,
        name: '',
      },
      content: [
        '',
        '',
        '',
      ]
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        title: 'Higher-Order Components',
        author: {
          avatar: 'http://jamesknelson.com/wp-content/uploads/2016/11/james-k-nelson-1-150x150.jpg',
          name: 'James K Nelson',
        },
        content: [
          'Do you ever find yourself frustrated with all the boilerplate and repetitive code in React components? Frequent use of patterns make components long-winded, hard to reason about, and difficult to maintain. And with mixins no longer supported in ES6 components, there is no longer any obvious solution!',
          'Higher-Order Components (HOCs) are JavaScript functions which add functionality to existing component classes. Just as React components let you add functionality to an application, Higher-Order Components let you add functionality to components. You could say they’re components for components.',
          'Another way of thinking about HOCs is that they let you generate code automatically. You might be familiar with this concept from other languages. For example, Ruby programmers often call it metaprogramming.',
        ]
      })
    }, 3000)
  }

  render() {
    const state = this.state
    return (
      <div className="container">
        <h.Title className="article-title">
          { state.title }
        </h.Title>
        <div className="author-info">
          <Img className="author-info_avatar" src={state.author.avatar}/>
          <Span className="author-info_name">
            { state.author.name }
          </Span>
        </div>
        <div className="article-content">
          {state.content.map((chunk, index) => {
            if (!index || index === state.content.length - 1) {
              return <p.TextMin key={index} className="article-content_p">{ chunk }</p.TextMin>
            }
            return <p.TextMax key={index} className="article-content_p">{ chunk }</p.TextMax>
          })}
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

const p = {
  TextMin: P.withHolder(holders.Text, {
    length: 220,
    fontSize: 16,
  }),
  TextMax: P.withHolder(holders.Text, {
    length: 300,
    fontSize: 16,
  }),
}
