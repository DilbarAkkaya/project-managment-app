import { Component } from '@angular/core';
import { TodoItem } from './models/todo.model';

@Component({
  selector: 'pma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todoList: TodoItem[] =[];
  constructor(){

  }
  onAddTodo(item: TodoItem){
    this.todoList.push(item)
  }
}
