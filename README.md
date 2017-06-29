# Intro

Hold the empty presentational(dumb) components in ReactJs.

[![build status](https://travis-ci.org/toplan/react-hold.svg?branch=master)](https://travis-ci.org/toplan/react-hold)
[![codecov](https://codecov.io/gh/toplan/react-hold/branch/master/graph/badge.svg)](https://codecov.io/gh/toplan/react-hold)
[![npm version](https://img.shields.io/npm/v/react-hold.svg)](https://www.npmjs.com/package/react-hold)
[![npm downloads](https://img.shields.io/npm/dm/react-hold.svg)](https://www.npmjs.com/package/react-hold)

![react-hold-article](http://toplan.github.io/img/react-hold-article.gif)

[Demo here](http://toplan.github.io/react-hold/)

# Install

```
npm install --save react-hold
```

# Usage

```js
import React from 'react'
import { render } from 'react-dom'
import hold from 'react-hold'
import MyComponent from './path/to/MyCompnent'

// hold the bulit-in component
const P = hold('p', (props) => !props.children)

// hold the composite component
const HoldableMyComponent = hold(MyComponent, (props) => !props.data)

class App extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      title: '',
      data: null,
    }
  }

  render() {
    return (
      <div className="my-class-name">
        <P>{ this.state.title }</P>
        <HoldableMyComponent data={this.state.data} />
      </div>
    )
  }
}

render(<App />, document.body)
```

If you want to make your component holdable by default, try decorator.

```js
import { holdify } from 'react-hold'

@holdify((props) => {
  return !props.data
})
class MyComponent extends React.Component {
  render() {
    return <div className="add-some-style">{ this.props.data }</div>
  }
}
```
# API

```js
import hold, { holdify } from 'react-hold'
```

### hold(Component, condition, [defaultHolder], [holderDefaultProps])

Create a higher-order component to hold the empty area which presented by the original component.
The higher-order component just a controller to control hold behavior, and the real filler is a series of different holders (later introduce).

##### Arguments

1. `Component` (Component) [Required]: The target(original) component, should be a presentational(dumb) component.
2. `condition` (Function) [Required]: The condition function will be called with arguments `props` and `prevProps`.
It should returns a bool value to judge the target component whether be empty (`true` means empty).
If the target component is empty, the higher-order component will use a holder which you specified to hold the empty area.
Otherwise, the higher-order component will cancel hold, and present the original component.
3. `defaultHolder` (Component) [Optional]: The default holder. Default `Fill`.
4. `holderDefaultProps` (Object) [Optional]: The default props of holder.

##### Returns

(Component): A higher-order holdable component which wrap the original component.

These props will be held by this higher-order component:
1. `holder` (Component) [Optional]: The holder component, will override the default holder.
2. `holderProps` (Object) [Optional]: The props of holder, will shallow override the default props.
3. `props` (Object) [Optional]: The alias of `holderProps`.
4. `innerRef` (Function|String) [Optional]: The ref of original component.

And the rest props will be passed to the original component.

### holdify(condition, [defaultHolder], [holderDefaultProps])

The handy decorator made by `hold` API.

# Holders

```js
import { Fill, Square, Circle, Text, Table } from 'react-hold/holders'
```

Every holders will put a special content(filler) in the empty area which presented by original component.

Common props:
1. `color` (String) [Optional]: The color of holder. Default `#eee`.
2. `cancelHold` (Function): Invoke this function can manually cancel hold. Injected by the higher-order component, and can't be override.
3. `targetProps` (Function): The props of target component. Injected by the higher-order component, and can't be override.
4. `children` [Optional]: The children elements.

### Fill

This holder will put a rectangle in the empty area.

The props:
1. `width` (String|Number) [Optional]: The width of rectangle.
2. `height` (String|Number) [Optional]: The height of rectangle.
3. `align` (String) [Optional]: If you set a width(etc. `300`) which lower than the real width of empty area,
the rectangle will not fill in the full empty area, but you can use this prop to set the align.
Support `left`, `right`, `center`. Default `center`.

### Square

This holder will put a square in the empty area.

The props:
1. `side` (String|Number) [Optional]: the side length of square.
2. `align` (String) [Optional]: Similar to the align prop of `Fill` holder.

### Circle

This holder will put a circle in the empty area.

The props:
1. `diameter` (String|Number) [Optional]: The diameter of circle.
2. `align` (String) [Optional]: Similar to the align prop of `Fill` holder.

### Text

This holder will put a piece of blank text in the empty area.

The props:
1. `length` (Number) [Optional]: The length of text. Default `100`.
2. `lineHeight` (String|Number) [Optional]: the line height of text. Default `2.3`.
3. `fontSize` (String|Number) [Optional]: the font size of text. Default `'0.7em'`.

### Table

This holder will put a table in the empty area.

The props:
1. `width` (Number) [Optional]: The width of table.
2. `height` (Number) [Optional]: The height of table.
3. `cols` (Number) [Optional]: The cols number of table. Default `2`.
4. `rows` (Number) [Optional]: The rows number of table. Default `2`.
5. `gap` (Number) [Optional]: The gap between cols and rows. Default `2`.
6. `align` (String) [Optional]: Similar to the align prop of `Fill` holder.

# License

MIT
