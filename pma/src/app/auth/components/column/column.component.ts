import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IColumnCreate, IColumnResponse, ITaskResponse, IUpdateTask } from 'src/app/models/api.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, switchMap } from 'rxjs';
import { BoardserviceService } from '../../services/board.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pma-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  providers: [FilterPipe]
})
export class ColumnComponent implements OnInit, OnDestroy {
  @Input() column: IColumnResponse | undefined;
  @Input() searchText!: string;
  @Output() removeColumnEvent = new EventEmitter<string>();
  boardId: string = '';
  tasks: ITaskResponse[] = [];
  sub: Subscription | undefined;
  columns: IColumnResponse[] = [];
  isTitleEdit: boolean = false;
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private translate: TranslateService, private route: ActivatedRoute, private boardservice: BoardserviceService, private dialogservice: ConfirmDialogService) {
  }
  edittitleForm = new FormGroup({
    title: new FormControl('', Validators.required),
  })
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
    prevTasks.splice(event.previousIndex, 1);
    currentTasks.splice(event.currentIndex, 0, moveTask);
    this.boardservice.updateTaskById(moveTask.boardId, moveTask.columnId, moveTask._id, {
      title: moveTask.title,
      order: moveTask.order,
      description: moveTask.description,
      columnId: moveTask.columnId,
      userId: moveTask.userId,
      users: moveTask.users
    })
      .subscribe(() => {
        this.snackBar.open(this.translate.instant('success.message'), this.translate.instant('success.close'), {
          duration: 2000,
          horizontalPosition: 'right',
          panelClass: ['success-snack'],
        })
      });
  }
  onremoveColumn(id: string) {
    this.dialogservice.openConfirm(this.translate.instant('column.deleteColumn')).afterClosed().subscribe(response => {
      if (response) {
        this.boardservice.deleteColumnById(this.boardId, id).subscribe(() => {
          this.columns = this.columns.filter((column) => column._id !== id)
          this.removeColumnEvent.emit(id);
        })
      }
    })
  }
  onremoveTask(id: string) {
    this.dialogservice.openConfirm(this.translate.instant('task.deleteTask')).afterClosed().subscribe(response => {
      if (response) {
        this.boardservice.deleteTaskById(this.boardId, this.column!._id, id).subscribe(() => {
          this.tasks = this.tasks.filter((task) => task._id !== id)
        })
      }
    })
  }
  openTaskForm() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: { boardId: this.boardId, columnId: this.column!._id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.task) {
        this.tasks.push(result.task);
      }
    }
    )
  }
  oneditTitle() {
    this.isTitleEdit = true;
  }
  onexitTitle() {
    this.isTitleEdit = false;
  }
  editSubmit() {
    if (this.edittitleForm.valid && this.boardId) {
      const column: IColumnCreate = {
        title: this.edittitleForm.value.title!,
        order: this.column!.order,
      }
      this.boardservice.updateColumnById(this.boardId, this.column!._id, column).subscribe((updatedcolumn) => {
        this.column!.title = updatedcolumn.title;
        this.isTitleEdit = false
      }
      )
    }
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }
}
