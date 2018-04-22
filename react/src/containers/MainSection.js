import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import { bindActionCreators } from 'redux'
import MainSection from '../components/MainSection'
import { getCompletedTodoCount, getFocusedTodos } from '../selectors'


const mapStateToProps = state => ({
  focusedTodos: getFocusedTodos(state),
  todosCount: state.todos.length,
  completedCount: getCompletedTodoCount(state)
})


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection)

