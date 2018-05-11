# React & Redux - elm to production

FROM: [https://github.com/reactjs/redux/tree/master/examples/todomvc](https://github.com/reactjs/redux/tree/master/examples/todomvc)

# how to add elm

- add [elm-webpack-loader](https://github.com/elm-community/elm-webpack-loader) to your project and webpack config [./config/webpack.config.prod.js](./config/webpack.config.prod.js)
  ```
  npm i -S elm-webpack-loader
  ```
  ```javascript
  // webpack 2
  module.exports = {
    module: {
      rules: [
        ...
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: {
            loader: 'elm-webpack-loader',
            options: {}
          }
        },
    }
  }
  ```
- [OPTIONAL] create a wrapper around elm embed [./src/elm.jsx](./src/elm.jsx)
  ```javascript
  import React from 'react'

  export default class extends React.Component {
    constructor(props) {
      super(props)

      this.initialize = this.initialize.bind(this)
    }

    shouldComponentUpdate() {
      return false
    }

    initialize(node) {
      if (!node === null) {
        return
      }

      const app = this.props.src.embed(node, this.props.flags)

      if (typeof this.props.ports !== 'undefined') {
        this.props.ports(app.ports)
      }
    }

    render() {
      return React.createElement('div', { ref: this.initialize });
    }
  }
  ```
- import your elm component and use it [./src/components/MainSection.js](./src/components/MainSection.js)
  ```javascript
  import {Main} from '../elmfocus/Main.elm'
  import Elm from '../elm.jsx'
  ```
  ```javascript
  <Elm src={Main} ports={setupPorts(actions)}/>
  ```
  ```javascript
  let portsState
  const setupPorts = (actions) => (ports) => {
    ports.done.subscribe(actions.completeTodo)
    portsState = ports
  }
  ```
  ```html
  <div>
    <button
      onClick={() => portsState.todos.send(focusedTodos)}
      className="focus-mode"
    >go to focus mode</button>
  </div>
  ```
