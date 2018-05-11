# VanillaJS - elm to production

FROM: [https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanillajs](https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanillajs)

# how to add elm

- build your elm component and reference it in your html [./elmfocus/package.json](./elmfocus/package.json)
  ```
  elm-make Main.elm --output focus.js
  ```
- reference elm in your app [./index.html](./index.html)
  ```html
  <script src="elmfocus/focus.js"></script>
  ```
- embed your app [./js/elmFocusConnector.js](./js/elmFocusConnector.js)
  ```javascript
  const node = document.getElementById('focus-app')
  const elmApp = Elm.Main.embed(node);
  ```
- you can save the elm app in `window.` scope for easy access in the rest of your JS app
(or just ports, because why would you need anything else) [./js/elmFocusConnector.js](./js/elmFocusConnector.js)
  ```javascript
  window.focusMode = elmApp.ports
  ```
- now just use it where you need to connect to the elm component [./js/controller.js](./js/controller.js)
  ```javascript
  window.focusMode.done.subscribe(id => {
    self.toggleComplete(id, true)
  });
  ```
  ```javascript
  window.focusMode.todos.send(data)
  ```
