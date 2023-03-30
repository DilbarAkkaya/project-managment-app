import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoItem } from 'src/app/models/todo.model';

@Component({
  selector: 'pma-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.scss']
})
export class AddTodoFormComponent implements OnInit {
  todoItemName = '';
  idCounter = 0;
@Output() addTodo = new EventEmitter<TodoItem>();
  constructor(){}
  ngOnInit(): void {

  }
  onSubmit(){
    this.addTodo.emit({
      id: this.idCounter,
      title: this.todoItemName,
      isCompleted: false,
    });
    this.idCounter++;
    this.todoItemName = '';
  }
}
