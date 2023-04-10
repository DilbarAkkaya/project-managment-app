import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IColumnResponse, ITaskResponse } from 'src/app/models/api.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { BoardserviceService } from '../../services/board.service';

@Component({
  selector: 'pma-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit{
   @Input() column: IColumnResponse | undefined;
   boardId: string = '';
  tasks: ITaskResponse[] =[];
   constructor(private dialog: MatDialog, private route: ActivatedRoute, private boardservice: BoardserviceService){
  }
  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.boardId = params['id'];
        return this.boardservice.getColumnById(this.boardId, this.column!._id).pipe(
          switchMap((column: IColumnResponse) => {
            console.log('column777777777', column);
            this.column = column;
            console.log(this.column._id, 'columnID')
            return this.boardservice.getAllTasks(this.boardId, this.column._id);
          })
        );
      })
    ).subscribe((task) => {
      this.tasks =task;
    });
  }
  openTaskForm(){
    console.log(this.column?._id)
    const dialogRef = this.dialog.open(TaskFormComponent, {
          data: {boardId: this.boardId, columnId: this.column!._id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.clicked === 'submit') {
        console.log(result.form.value);
      }
    });
  }
}
