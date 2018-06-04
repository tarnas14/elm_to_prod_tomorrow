# Vue.js elm to production

FROM: [https://github.com/margaret2/vue-todo-list](https://github.com/margaret2/vue-todo-list)

# how to add elm

- add [elm-webpack-loader](https://github.com/elm-community/elm-webpack-loader) to your project and webpack config [./webpack.config.js:13](./webpack.config.js)
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
      ]
    },
  }
  ```
- [OPTIONAL] create a vue component wrapper around elm embed [./src/elm.js](./src/elm.js)
  ```javascript
  module.exports = function (elm) {
    return {
      props: {
        ports: {
          type: Function,
          required: false
        },
        flags: {
          type: Object,
          required: false
        }
      },
      render: function (createElement, _context) {
        return createElement('div')
      },
      mounted: function () {
        var node = this.$el
        var app = elm.embed(node, this.$props.flags)

        if (this.$props.ports) {
          this.$props.ports(app.ports);
        }
      }
    }
  }
  ```
- import your elm component and use it in vue code [./src/App.vue](./src/App.vue)
  ```javascript
  import {Main} from './elmfocus/Main.elm'
  import * as ElmComponent from './elm.js'
  ```
  ```javascript
  components: {
    FocusMode: ElmComponent(Main)
  },
  methods: {
    setupPorts: function (ports) {
      ports.done.subscribe((id) => {
        this.onCheck(id, true)
      })
      this.ports = ports
    },
  }
  ```
  ```html
  <FocusMode :ports="setupPorts"></FocusMode>
  ```
