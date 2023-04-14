import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IColumnCreate, IColumnResponse, ITaskResponse, IUpdateTask } from 'src/app/models/api.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, switchMap } from 'rxjs';
import { BoardserviceService } from '../../services/board.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';

@Component({
  selector: 'pma-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit, OnDestroy {
   @Input() column: IColumnResponse | undefined;
   @Output() removeColumnEvent = new EventEmitter<string>();
   boardId: string = '';
  tasks: ITaskResponse[] =[];
  sub: Subscription | undefined;
  columns: IColumnResponse[] =[];
   constructor(private dialog: MatDialog, private route: ActivatedRoute, private boardservice: BoardserviceService, private dialogservice: ConfirmDialogService){
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
    ).subscribe((result) => {
      this.tasks = result
    });

  }
  onDropTask(event: CdkDragDrop<ITaskResponse[]>, targetColumn: IColumnResponse) {
    const prevTasks = event.previousContainer.data;
    const currentTasks = event.container.data;
    const moveTask: ITaskResponse = prevTasks[event.previousIndex];

    moveTask.columnId = targetColumn._id;

    console.log(moveTask, 'move task');
    console.log(targetColumn, 'column task');

    prevTasks.splice(event.previousIndex, 1);
    currentTasks.splice(event.currentIndex, 0, moveTask);
    console.log(prevTasks)
    console.log(moveTask, 'moved task')
    console.log(currentTasks)


    this.boardservice.updateTaskById(moveTask.boardId, moveTask.columnId, moveTask._id, {

      title: moveTask.title,
      order: moveTask.order,
      description: moveTask.description,
      columnId: moveTask.columnId,
      userId: moveTask.userId,
      users: moveTask.users})
    .subscribe(() => {
      console.log(targetColumn)
    });
  }


/*   oncreateTask(task: ITaskResponse) {
    this.tasks.push(task);
  } */

  onremoveColumn(id: string){
    this.boardservice.deleteColumnById(this.boardId, id).subscribe(()=>{
      console.log(this.columns, '11111111111111111111')
      this.columns = this.columns.filter((column) => column._id !== id)
      this.removeColumnEvent.emit(id);
    })
  }

  onremoveTask(id: string){
/*     this.boardservice.deleteTaskById(this.boardId, this.column!._id, id).subscribe(()=>{
      this.tasks = this.tasks.filter((task)=> task._id !== id)
    }) */
    this.dialogservice.openConfirm("delete this column").afterClosed().subscribe(response => {
      if(response) {
        this.boardservice.deleteTaskById(this.boardId, this.column!._id, id).subscribe(()=>{
          this.tasks = this.tasks.filter((task)=> task._id !== id)
        })
      }
  })
  }
  openTaskForm(){
    const dialogRef = this.dialog.open(TaskFormComponent, {
          data: {boardId: this.boardId, columnId: this.column!._id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result.task)
      if (result && result.task) {
        this.tasks.push(result.task);
    }
  }
    )}
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
