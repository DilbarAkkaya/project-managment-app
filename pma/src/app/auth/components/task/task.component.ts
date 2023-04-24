import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IColumnResponse, ITaskResponse } from 'src/app/models/api.model';
import { BoardserviceService } from '../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { TaskUpdateComponent } from '../task-update/task-update.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pma-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: ITaskResponse | undefined;
  @Input() column: IColumnResponse | undefined;
  @Input() boardId: string = '';
  @Input() tasks: ITaskResponse[] = [];
  @Output() removeTaskEvent = new EventEmitter<string>();
  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private translate: TranslateService, private boardservice: BoardserviceService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
  }
  removeTask(id: string, event: Event) {
    event.stopPropagation();
    this.removeTaskEvent.emit(id);
  }
  openTaskForm(id: string) {
    const dialogRef = this.dialog.open(TaskUpdateComponent, {
      data: { boardId: this.boardId, columnId: this.column!._id, id }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.task) {
        const taskIndex = this.tasks.findIndex((t) => t._id === result.task._id);
        if (taskIndex >= 0) {
          this.tasks[taskIndex] = result.task;
          this.snackBar.open(this.translate.instant('success.message'), this.translate.instant('success.close'), {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass: ['success-snack'],
          })
        }
      }
    });
  }
}
