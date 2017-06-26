import React from 'react'
import createRefiter from '../createRefiter'

describe('Component refiter', () => {
  it('refit dom component', () => {
    const component = 'div'
    const refiter = createRefiter(component)

    expect(typeof refiter.refit).toBe('function')
    expect(typeof refiter.undo).toBe('function')

    refiter.refit()
    expect(component).toBe(component)

    refiter.undo()
    expect(component).toBe(component)
  })

  it('refit functional component', () => {
    const component = () => (<div>foo</div>)
    const refiter = createRefiter(component)

    expect(typeof refiter.refit).toBe('function')
    expect(typeof refiter.undo).toBe('function')

    refiter.refit()
    expect(component.prototype.componentDidMount).toBeUndefined()
    expect(component.prototype.componentWillUnmount).toBeUndefined()

    refiter.undo()
    expect(component.prototype.componentDidMount).toBeUndefined()
    expect(component.prototype.componentWillUnmount).toBeUndefined()
  })

  it('refit react component', () => {
    const FooComponent = createFooComponent()
    const refiter = createRefiter(FooComponent)

    expect(typeof refiter.refit).toBe('function')
    expect(typeof refiter.undo).toBe('function')

    const prototype = FooComponent.prototype
    const componentDidMount = prototype.componentDidMount
    const componentWillUnmount = prototype.componentWillUnmount

    refiter.refit()
    refiter.refit()
    expect(prototype.componentDidMount).toBeNull()
    expect(componentWillUnmount).not.toBe(prototype.componentWillUnmount)

    refiter.undo()
    refiter.undo()
    expect(prototype.componentDidMount).toBe(componentDidMount)
    expect(prototype.componentWillUnmount).toBe(componentWillUnmount)
  })
})

function createFooComponent() {
  return class FooComponent extends React.Component {
    constructor(...args) {
      super(...args)
      this.state = {
        foo: 'foo',
      }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
      return (
        <p>
          { this.state.foo }
        </p>
      )
    }
  }
}
