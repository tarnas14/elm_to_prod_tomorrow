const node = document.getElementById('focus-app')
const app = Elm.Main.embed(node);

window.focusOn = app.ports.todos.send
app.ports.done.subscribe(window.setDone)
