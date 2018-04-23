import {Component, AfterContentInit} from '@angular/core';
import {Todo} from './todo';
import {TodoDataService} from './todo-data.service';
const Elm = require('../elmfocus/focus.js');

let elmApp

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent implements AfterContentInit {

  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService) {
  }

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  toggleTodoFocus(todo) {
    this.todoDataService.toggleTodoFocus(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  focus() {
    elmApp.ports.todos.send(this.todoDataService.getFocusedTodos());
  }

  get todos() {
    return this.todoDataService.getAllTodos();
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
