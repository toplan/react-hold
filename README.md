# Intro

Automatically show a well-fitting placeholder for dumb component while its content is loading. [[Demo here]](http://toplan.github.io/react-hold/)

> What is the meaning of the word `hold` in the project name? It is intercepted from the word `placeholder`, represents the action which make component has a placeholder.

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

// make the bulit-in component has a placeholder
const P = hold('p', (props) => !props.children)

// make the composite component has a placeholder
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

If you want to make your component has a placeholder by default, try decorator.

```js
import { holdify } from 'react-hold'

@holdify((props) => !props.data)
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

Create a higher-order component to manage the original component and [placeholder](#placeholders) component.

##### Arguments

- `Component` (Component) [Required]: The target(original) component, should be a dumb(presentational) component.
- `condition` (Function) [Required]: The condition function will be called with arguments `props` and `prevProps`.
It needs to returns a boolean value to judge whether to show the placeholder component(`true` means yes).
If returns `false`, the higher-order component will remove the placeholder component, and show the original component.
- `defaultHolder` (Component) [Optional]: The default placeholder component. Default [Fill](#fill).
- `holderDefaultProps` (Object) [Optional]: The default props of placeholder component.

##### Returns

(Component): A higher-order component, control the display of original component and placeholder component.

The higher-order component supports these props:
- `holder` (Component) [Optional]: The placeholder component, will override the default placeholder.
- `holderProps` (Object) [Optional]: The props of placeholder component, will shallow override the default props.
- `props` (Object) [Optional]: The alias of `holderProps`.
- `innerRef` (Function|String) [Optional]: The ref of original component.

> The rest props will be passed to the original component.

### holdify(condition, [defaultHolder], [holderDefaultProps])

The handy decorator made by `hold` API.

# Placeholders

```js
import { Fill, Square, Circle, Text, Table } from 'react-hold/holders'
```

You can import the built-in placeholders from `react-hold/holders`, every different placeholders use to display a different content.

##### Common Props
- `color` (String) [Optional]: The color of placeholder. Default `#eee`.
- `cancelHold` (Function): Invoke this function to display original component, injected by the higher-order component, can't be override.
- `targetProps` (Function): The props of target component, injected by the higher-order component, can't be override.
- `children` [Optional]

### Fill

This placeholder will display a rectangle.

##### Props
- `width` (String|Number) [Optional]: The width of rectangle.
- `height` (String|Number) [Optional]: The height of rectangle.
- `align` (String) [Optional]: If you set a width(such as `300`) lower than the real width of original component,
the rectangle will not fill in the full area, but you can use this prop to set the alignment.
Support `left`, `right` and `center`. Default `center`.

### Square

This placeholder will display a square.

##### Props
- `side` (String|Number) [Optional]: the side length of square.
- `align` (String) [Optional]: Similar to the align prop of `Fill`.

### Circle

This placeholder will display a circle.

##### Props
- `diameter` (String|Number) [Optional]: The diameter of circle.
- `align` (String) [Optional]: Similar to the align prop of `Fill`.

### Text

This placeholder will display a piece of blank text.

##### Props
- `length` (Number) [Optional]: The length of text. Default `100`.
- `lineHeight` (String|Number) [Optional]: the line height of text. Default `2.3`.
- `fontSize` (String|Number) [Optional]: the font size of text. Default `'0.7em'`.

### Table

This placeholder will display a table.

##### Props
- `width` (Number) [Optional]: The width of table.
- `height` (Number) [Optional]: The height of table.
- `cols` (Number) [Optional]: The cols number of table. Default `2`.
- `rows` (Number) [Optional]: The rows number of table. Default `2`.
- `gap` (Number) [Optional]: The gap between cols and rows. Default `2`.
- `align` (String) [Optional]: Similar to the align prop of `Fill`.

# License

MIT
