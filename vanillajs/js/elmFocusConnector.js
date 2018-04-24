const node = document.getElementById('focus-app')
const elmApp = Elm.Main.embed(node);

window.focusMode = elmApp.ports
