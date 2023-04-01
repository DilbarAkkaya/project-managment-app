import { Component } from '@angular/core';
import { TodoItem } from 'src/app/models/todo.model';

@Component({
  selector: 'pma-selected-board-page',
  templateUrl: './selected-board-page.component.html',
  styleUrls: ['./selected-board-page.component.scss']
})
export class SelectedBoardPageComponent {
  todoList: TodoItem[] =[];
  constructor(){

  }
  onAddTodo(item: TodoItem){
    this.todoList.push(item)
  }
}
