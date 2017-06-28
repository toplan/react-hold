# Intro

Hold the empty presentational(dumb) components in ReactJs.

[![build status](https://travis-ci.org/toplan/react-hold.svg?branch=master)](https://travis-ci.org/toplan/react-hold)
[![codecov](https://codecov.io/gh/toplan/react-hold/branch/master/graph/badge.svg)](https://codecov.io/gh/toplan/react-hold)
[![npm version](https://img.shields.io/npm/v/react-hold.svg)](https://www.npmjs.com/package/react-hold)
[![npm downloads](https://img.shields.io/npm/dm/react-hold.svg)](https://www.npmjs.com/package/react-hold)

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
    return <div>{ this.props.data }</div>
  }
}
```
# API

```js
import hold, { holdify } from 'react-hold'
```

### hold(Component, condition, [defaultHolder], [holderDefaultProps])

##### Arguments

1. `Component` (Component): The target component,
should be a presentational(dumb) component in ReactJS.

2. `condition` (Function): The condition function will be called with arguments `props` and `prevProps`,
should returns a bool value to judge the target component whether be empty.

3. `defaultHolder` (Component): The default holder will be placed in empty target component. Default `Fill`.

4. `holderDefaultProps` (Object): The default props of holder.

##### Returns

(Component): A higher-order holdable component.

### holdify(condition, [defaultHolder], [holderDefaultProps])

The handy decorator of `hold` api.

# Holders

```js
import { Fill, Square, Circle, Text, Table } from 'react-hold/holders'
```

- Common props

| Prop  | Type    | Description |
| ----- | :-----: | :-----: |
| color | String  | The color of holder, default `#eee`  |
| cancelHold | Function | Manually cancel hold the target component |
| targetProps | Object | The props of target component |
| children | -- | The children of holder |


### Fill

This holder will fill in the target component.

- Props

| Prop  | Type    | Default |
| ----- | :-----: | :-----: |
| width | String, Number | `null` |
| height| String, Number | `null` |
| align | String | `center` |

### Square

This holder will put a square in the target component.

- Props

| Prop  | Type    | Default |
| ----- | :-----: | :-----: |
| side  | String, Number | `null` |
| align | String  | `center` |

### Circle

This holder will put a circle in the target component.

- Props

| Prop  | Type    | Default |
| ----- | :-----: | :-----: |
| diameter | String, Number | `null` |
| align | String | `center` |

### Text

This holder will put a piece of blank text in the target component.

- Props

| Prop  | Type    | Default |
| ----- | :-----: | :-----: |
| length | Number | `100` |
| lineHeight | String, Number | `2.3` |
| fontSize | String, Number | `'0.7em'` |

### Table

This holder will put a table in the target component.

- Props

| Prop  | Type    | Default |
| ----- | :-----: | :-----: |
| width | Number | `null` |
| height| Number | `null` |
| cols  | Number | `2` |
| rows  | Number | `2` |
| gap   | Number | `2` |
| align | String | `center` |

# License

MIT
