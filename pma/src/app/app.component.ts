import { Component } from '@angular/core';
import { TodoItem } from './models/todo.model';

@Component({
  selector: 'pma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todoItemName = '';
  todoList: TodoItem[] =[];
  idCounter = 0;
  constructor(){

  }
  onSubmit(){
    this.todoList.push({
      id: this.idCounter,
      title: this.todoItemName,
      isCompleted: false,
    });
    this.idCounter++;
    this.todoItemName = '';
  }
  toggleComplete(item:TodoItem){
    item.isCompleted = !item.isCompleted;
    console.log(this.todoList)
  }
}
