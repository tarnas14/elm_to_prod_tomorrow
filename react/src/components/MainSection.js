import React from 'react'
import PropTypes from 'prop-types'
import Footer from './Footer'
import VisibleTodoList from '../containers/VisibleTodoList'
import {Main} from '../elmfocus/Main.elm'
import Elm from '../elm.jsx'

let portsState

const setupPorts = (actions) => (ports) => {
  ports.done.subscribe(actions.completeTodo)
  portsState = ports
}

const MainSection = ({ focusedTodos, todosCount, completedCount, actions }) =>
  (
    <div>
      <Elm src={Main} ports={setupPorts(actions)} style={{
        margin: 0,
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'white',
        zIndex: 9001,
      }} />
      <div><button onClick={() => portsState.todos.send(focusedTodos)} className="focus-mode">go to focus mode</button></div>
      <section className="main">
        {
          !!todosCount && 
          <span>
            <input
              className="toggle-all"
              type="checkbox"
              checked={completedCount === todosCount}
            />
            <label onClick={actions.completeAllTodos}/>
          </span>
        }
        <VisibleTodoList />
        {
          !!todosCount &&
          <Footer
            completedCount={completedCount}
            activeCount={todosCount - completedCount}
            onClearCompleted={actions.clearCompleted}
          />
        }
      </section>
    </div>
  )

MainSection.propTypes = {
  focusedTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  todosCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection;
