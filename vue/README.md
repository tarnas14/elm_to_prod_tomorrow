# elm to production

FROM: https://github.com/margaret2/vue-todo-list

# how to add elm

all you need is [elm-webpack-loader](https://github.com/elm-community/elm-webpack-loader)

and some code additional code in './src/elm.js' if you want a component to render your app in
(this is not necessary, it's just some sugar to embed elm automatically and not duplicate code everywhere you use elm components)

---

# original readme
# todo2

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
