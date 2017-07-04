import './style.css'
import React, { Component } from 'react'
import hold from 'react-hold'
import { Fill, Circle, Text } from 'react-hold/holders'
import animation, { BLINK } from 'react-hold-animation'
import { H, Img, P, Span } from '$components'
import image from '../_img/james-k-nelson.jpg';

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
          avatar: image,
          name: 'James K Nelson',
        },
      })
      setTimeout(() => {
        this.setState({
          content: [
            'Do you ever find yourself frustrated with all the boilerplate and repetitive code in React components? Frequent use of patterns make components long-winded, hard to reason about, and difficult to maintain. And with mixins no longer supported in ES6 components, there is no longer any obvious solution!',
            'Higher-Order Components (HOCs) are JavaScript functions which add functionality to existing component classes. Just as React components let you add functionality to an application, Higher-Order Components let you add functionality to components. You could say they’re components for components.',
            'Another way of thinking about HOCs is that they let you generate code automatically. You might be familiar with this concept from other languages. For example, Ruby programmers often call it metaprogramming.',
          ],
        })
      }, 1000)
    }, 1800)
  }

  render() {
    const state = this.state
    return (
      <div className="container">
        <H holder={animation(Fill)} props={{width: '60%'}} className="article-title">
          { state.title }
        </H>
        <div className="author-info">
          <div>
            <Img holder={animation(Circle)} props={{animation: BLINK}} className="author-info_avatar" src={state.author.avatar}/>
            <Span holder={animation(Fill)} className="author-info_name">
              { state.author.name }
            </Span>
          </div>
        </div>
        <div className="article-content">
          {state.content.map((chunk, index) => {
            if (!index || index === state.content.length - 1) {
              return <P holder={animation(Text)} props={{length: 220}} key={index} className="article-content_p">{ chunk }</P>
            }
            return <P holder={animation(Text)} props={{length: 350}} key={index} className="article-content_p">{ chunk }</P>
          })}
        </div>
      </div>
    )
  }
}

export default App
