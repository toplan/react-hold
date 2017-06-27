import React from 'react'
import { mount } from 'enzyme'
import { Circle, Fill, Square, Table, Text } from '../index'

describe('Holders', () => {
  it('render Circle correctly', () => {
    let wrapper = mount(<Circle>foo-0</Circle>)
    expect(wrapper).toMatchSnapshot()


    const props = {
      color: 'red',
      width: 50,
      height: 60,
    }
    wrapper = mount(<Circle {...props}>foo-0-1</Circle>)
    expect(wrapper).toMatchSnapshot()
  })

  it('render Fill correctly', () => {
    let wrapper = mount(<Fill>foo-1</Fill>)
    expect(wrapper).toMatchSnapshot()

    const props = {
      color: 'red',
      width: '60%',
      height: '30px',
    }
    wrapper = mount(<Fill {...props}>foo-1-1</Fill>)
    expect(wrapper).toMatchSnapshot()
  })

  it('render Square correctly', () => {
    let wrapper = mount(<Square>foo-2</Square>)
    expect(wrapper).toMatchSnapshot()

    const props = {
      color: 'red',
      width: 50,
      height: 60,
    }
    wrapper = mount(<Square {...props}>foo-2-1</Square>)
    expect(wrapper).toMatchSnapshot()
  })

  it('render Table correctly', () => {
    let wrapper = mount(<Table>foo-3</Table>)
    expect(wrapper).toMatchSnapshot()

    const props = {
      color: 'red',
      width: 360,
      height: 60,
      gap: 4,
    }
    wrapper = mount(<Table {...props}>foo-3-1</Table>)
    expect(wrapper).toMatchSnapshot()
  })

  it('render Text correctly', () => {
    let wrapper = mount(<Text>foo-4</Text>)
    expect(wrapper).toMatchSnapshot()

    const props = {
      color: 'red',
      length: 300,
    }
    wrapper = mount(<Text {...props}>foo-4-1</Text>)
    expect(wrapper).toMatchSnapshot()
  })
})
