# Intro

Automatically show a well-fitting placeholder for dumb component while its content is loading. [[Demo here]](http://toplan.github.io/react-hold/)

> What is the meaning of the word `hold` in the project name? It is intercepted from the word `placeholder`, represents the action to make component has placeholder.

[![build status](https://travis-ci.org/toplan/react-hold.svg?branch=master)](https://travis-ci.org/toplan/react-hold)
[![codecov](https://codecov.io/gh/toplan/react-hold/branch/master/graph/badge.svg)](https://codecov.io/gh/toplan/react-hold)
[![npm version](https://img.shields.io/npm/v/react-hold.svg)](https://www.npmjs.com/package/react-hold)
[![npm downloads](https://img.shields.io/npm/dm/react-hold.svg)](https://www.npmjs.com/package/react-hold)

![react-hold-article](http://toplan.github.io/img/react-hold-article.gif)



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

// make the bulit-in component has placeholder
const P = hold('p', (props) => !props.children)

// make the composite component has placeholder
const MyComponentWithPlaceholder = hold(MyComponent, (props) => !props.data)

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
        <MyComponentWithPlaceholder data={this.state.data} />
      </div>
    )
  }
}

render(<App />, document.body)
```

If you want to make your component has placeholder by default, try decorator.

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

Create a higher-order component which had bound the original component and placeholder together.
The higher-order component is a controller to control show original component or placeholder.

##### Arguments

- `Component` (Component) [Required]: The target(original) component, should be a dumb(presentational) component.
- `condition` (Function) [Required]: The condition function will be called with arguments `props` and `prevProps`.
It needs to returns a bool value to judge whether to show the placeholder (`true` means yes).
If returns `false`, the higher-order component will remove placeholder, and show the original component.
- `defaultHolder` (Component) [Optional]: The default placeholder. Default `Fill` (later introduce).
- `holderDefaultProps` (Object) [Optional]: The default props of placeholder.

##### Returns

(Component): A higher-order component which bound the original component and placeholder together.

These props will be held by the higher-order component:
- `holder` (Component) [Optional]: The placeholder component, will override the default placeholder.
- `holderProps` (Object) [Optional]: The props of placeholder, will shallow override the default props.
- `props` (Object) [Optional]: The alias of `holderProps`.
- `innerRef` (Function|String) [Optional]: The ref of original component.

The rest props will be passed to the original component.

### holdify(condition, [defaultHolder], [holderDefaultProps])

The handy decorator made by `hold` API.

# Holders

```js
import { Fill, Square, Circle, Text, Table } from 'react-hold/holders'
```

Every holders(also known as placeholder) will show a special content.

##### Common Props
- `color` (String) [Optional]: The color of holder. Default `#eee`.
- `cancelHold` (Function): Invoke this function can manually cancel hold, injected by the higher-order component, and can't be override.
- `targetProps` (Function): The props of target component, injected by the higher-order component, and can't be override.

### Fill

This holder will show a rectangle.

##### Props
- `width` (String|Number) [Optional]: The width of rectangle.
- `height` (String|Number) [Optional]: The height of rectangle.
- `align` (String) [Optional]: If you set a width(etc. `300`) which lower than the real width of empty area,
the rectangle will not fill in the full empty area, but you can use this prop to set the align.
Support `left`, `right`, `center`. Default `center`.

### Square

This holder will show a square.

##### Props
- `side` (String|Number) [Optional]: the side length of square.
- `align` (String) [Optional]: Similar to the align prop of `Fill` holder.

### Circle

This holder will show a circle.

##### Props
- `diameter` (String|Number) [Optional]: The diameter of circle.
- `align` (String) [Optional]: Similar to the align prop of `Fill` holder.

### Text

This holder will show a piece of blank text.

##### Props
- `length` (Number) [Optional]: The length of text. Default `100`.
- `lineHeight` (String|Number) [Optional]: the line height of text. Default `2.3`.
- `fontSize` (String|Number) [Optional]: the font size of text. Default `'0.7em'`.

### Table

This holder will show a table.

##### Props
- `width` (Number) [Optional]: The width of table.
- `height` (Number) [Optional]: The height of table.
- `cols` (Number) [Optional]: The cols number of table. Default `2`.
- `rows` (Number) [Optional]: The rows number of table. Default `2`.
- `gap` (Number) [Optional]: The gap between cols and rows. Default `2`.
- `align` (String) [Optional]: Similar to the align prop of `Fill` holder.

# License

MIT
