import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IColumnResponse, ITaskResponse } from 'src/app/models/api.model';
import { BoardserviceService } from '../../services/board.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { TaskUpdateComponent } from '../task-update/task-update.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'pma-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit{
  @Input() task: ITaskResponse|undefined;
  @Input() column: IColumnResponse | undefined;
  @Input() boardId: string = '';
  @Input() tasks: ITaskResponse[] =[];
  @Output() removeTaskEvent = new EventEmitter<string>();
  constructor(private route: ActivatedRoute, private boardservice: BoardserviceService, private dialog: MatDialog){
  }
  ngOnInit(): void {
  }
  removeTask(id: string, event: Event) {
    event.stopPropagation();
    this.removeTaskEvent.emit(id);
  }
  openTaskForm(id: string) {
    const dialogRef = this.dialog.open(TaskUpdateComponent, {
      data: {boardId: this.boardId, columnId: this.column!._id, id }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result && result.task) {
        const taskIndex = this.tasks.findIndex((t) => t._id === result.task._id);
        if (taskIndex >= 0) {
          this.tasks[taskIndex] = result.task;
        }
      }
    });
  }
/*
  removeTask(id: string){
    this.boardservice.deleteTaskById(this.boardId, this.column!._id, id).subscribe(()=>{
      console.log('delete', this.tasks)
      this.tasks = this.tasks.filter((task)=>{
        console.log(task, '5555')
        task._id !== id})
    })
  } */
}

/*     this.route.params.pipe(
      switchMap((params: Params) => {
        this.boardId = params['id'];
        return this.boardservice.getColumnById(this.boardId, this.column!._id).pipe(
          switchMap((column: IColumnResponse) => {
            this.column = column;
            return this.boardservice.getAllTasks(this.boardId, this.column._id);
          })
        );
      })
    ).subscribe((task) => {
      this.tasks =task;
    }); */
