import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IColumnResponse, ITaskResponse } from 'src/app/models/api.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, switchMap } from 'rxjs';
import { BoardserviceService } from '../../services/board.service';

@Component({
  selector: 'pma-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit, OnDestroy{
   @Input() column: IColumnResponse | undefined;

   boardId: string = '';
  tasks: ITaskResponse[] =[];
  sub: Subscription | undefined;
   constructor(private dialog: MatDialog, private route: ActivatedRoute, private boardservice: BoardserviceService){
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.boardId = params['id'];
        return this.boardservice.getColumnById(this.boardId, this.column!._id).pipe(
          switchMap((column: IColumnResponse) => {
            this.column = column;
            return this.boardservice.getAllTasks(this.boardId, this.column._id);
          })
        );
      })
    ).subscribe((res) => {
      this.tasks = res
console.log(this.tasks)
    });

  }

  onremoveTask(id: string){
    this.boardservice.deleteTaskById(this.boardId, this.column!._id, id).subscribe(()=>{
      console.log('delete', this.tasks)
      this.tasks = this.tasks.filter((task)=>{
        console.log(task, '5555')
        task._id !== id})
    })
  }
  openTaskForm(){
    const dialogRef = this.dialog.open(TaskFormComponent, {
          data: {boardId: this.boardId, columnId: this.column!._id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.clicked === 'submit') {
        result = result.form.value;
      }
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }
}


/*     this.sub = this.route.params.pipe(
      switchMap((params: Params) => {
        this.boardId = params['id'];
        console.log(this.column!._id, this.boardId)
        return this.boardservice.getColumnById(this.boardId, this.column!._id);
      })
        ).subscribe((column: IColumnResponse)=>{
          this.column = column;
          this.boardservice.refresh$.subscribe(()=>{
            this.getAllTasks(this.boardId, this.column!._id);
          })
         this. getAllTasks(this.boardId, this.column!._id);
        }) */
/*         private getAllTasks(idB:string, idC:string) {
          this.boardservice.getAllTasks(idB, idC).subscribe((result: ITaskResponse[]) => {
            this.tasks = result;
          });
        } */
