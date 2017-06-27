import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import HoC from '../HoC'
import Square from '../holders/Square'

const P = HoC('p', props => !props.children)

describe('Holdable HoC component', () => {
  it('Create correctly', () => {
    expect(P).toHaveProperty('displayName', 'Hold(p)')
    expect(P.propTypes.holder).not.toBeNull()
    expect(P.propTypes.holderProps).not.toBeNull()
    expect(P.propTypes.props).not.toBeNull()
    expect(P.propTypes.innerRef).not.toBeNull()
    expect(P.defaultProps.holder).not.toBeUndefined()
    expect(P.defaultProps.holderProps).not.toBeUndefined()
    expect(P.defaultProps.props).not.toBeUndefined()
    expect(P.defaultProps.innerRef).not.toBeUndefined()
  })

  it('Do not hold', () => {
    const wrapper = mount(<Container presentation={P}>foo</Container>)
    expect(wrapper).toMatchSnapshot()
  })

  it('Hold', () => {
    const wrapper = mount(<Container presentation={P} />)
    expect(wrapper).toMatchSnapshot()

    wrapper.setState({ children: 'I am child, then cancel hold.' })
    expect(wrapper).toMatchSnapshot()

    wrapper.setState({
      props: {
        name: 'bar',
        holder: Square,
        holderProps: {
          color: 'green',
          width: 40,
          height: 30,
        },
      },
      children: '',
    })
    expect(wrapper).toMatchSnapshot()
  })
})

class Container extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      props: {
        name: 'foo',
        holder: undefined,
        holderProps: null,
      },
      children: this.props.children,
    }
  }

  render() {
    const { presentation } = this.props
    const { props, children } = this.state
    return (
      <div>
        { React.createElement(presentation, props, children) }
      </div>
    )
  }
}

Container.propTypes = {
  presentation: PropTypes.func.isRequired,
  children: PropTypes.string,
}

Container.defaultProps = {
  children: '',
}
