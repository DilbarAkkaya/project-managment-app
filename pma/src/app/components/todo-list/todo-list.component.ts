import { Component, OnInit, Input } from '@angular/core';
import { TodoItem } from 'src/app/models/todo.model';

@Component({
  selector: 'pma-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{
  @Input() todoList: TodoItem[] =[];
  constructor(){}
  ngOnInit(): void {}
  toggleComplete(item:TodoItem){
    item.isCompleted = !item.isCompleted;
    console.log(this.todoList)
  }
}
