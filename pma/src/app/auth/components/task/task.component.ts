import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IColumnResponse, ITaskResponse } from 'src/app/models/api.model';
import { BoardserviceService } from '../../services/board.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'pma-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit{
  @Input() task: ITaskResponse|undefined;
  @Input() column: IColumnResponse | undefined;
  @ Input() boardId: string = '';
  @Input() tasks: ITaskResponse[] =[];
  @Output() removeTaskEvent = new EventEmitter<string>();
  constructor(private route: ActivatedRoute, private boardservice: BoardserviceService){
  }
  ngOnInit(): void {
  }
  removeTask(id: string) {
    this.removeTaskEvent.emit(id);
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
