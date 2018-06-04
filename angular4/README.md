# Angular4 - elm to production

FROM: [https://github.com/addyosmani/todomvc-angular-4](https://github.com/addyosmani/todomvc-angular-4)

# how to add elm

I wish we could just add [elm-webpack-loader](https://github.com/elm-community/elm-webpack-loader)
but it doesn't work (probably because of some TS loading magic)

that's why we are falling back to building elm into js and using that like peasants:

- build the elm component (added it to npm scripts)
  ```javascript
  "scripts": {
    "build-elm": "cd ./src/elmfocus && npm run build", // does elm-make Main.elm --output focus.js
    "prestart": "npm run build-elm",
    ...
  }
  ```
- configure TS to allow regular javascript imports
  ```
  // ./src/tsconfig.app.json
  {
    "compilerOptions": {
      "allowJs": true,
      "types": ["node"]
    }
  }
  ```
- import built elm component [./src/app/app.component.ts](./src/app/app.component.ts)
  ```javascript
  const Elm = require('../elmfocus/focus.js');
  ```
- hook up elm ports in your angular application logic [./src/app/app.component.ts](./src/app/app.component.ts)
  ```javascript
  let elmApp
  // ...
  export class AppComponent implements AfterContentInit {
    // rest of the logic

    focus() {
      elmApp.ports.todos.send(this.todoDataService.getFocusedTodos());
    }

    ngAfterContentInit () {
      const node = document.getElementById('focus-mode')
      elmApp = Elm.Main.embed(node)
      elmApp.ports.done.subscribe(id => {
        const todo = this.todoDataService.getTodoById(id)

        this.toggleTodoComplete(todo)
      })
    }

  }
  ```
- add the #focus-mode element to your angular template [./src/app/app.component.html](./src/app/app.component.html)
  ```html
  <section class="todoapp">
    <div id="focus-mode"></div>
    <!-- ... -->
  </section>
  ```
