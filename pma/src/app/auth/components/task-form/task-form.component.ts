import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { BoardserviceService } from '../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITaskCreate, ITaskResponse } from 'src/app/models/api.model';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pma-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Output() taskCreated = new EventEmitter<ITaskResponse>();
  boardId: string = '';
  columnId: string = '';
  tasks: ITaskResponse[] = [];
  constructor(private dialogRef: MatDialogRef<ModalCreateComponent>, private snackBar: MatSnackBar, private translate: TranslateService, private boardService: BoardserviceService, private route: ActivatedRoute, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { boardId: string, columnId: string }) {
    this.boardId = data.boardId,
      this.columnId = data.columnId
  }
  createForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })
  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
  createSubmit(): void {
    if (this.createForm.valid && this.boardId) {
      const task: ITaskCreate = {
        title: this.createForm.value.title!,
        description: this.createForm.value.description!,
        order: 0,
        userId: 0,
        users: ['']
      }
      this.boardService.createTask(this.boardId, this.columnId, task).subscribe((task) => {
        this.taskCreated.emit(task);
        this.dialogRef.close({ task });
        this.snackBar.open(this.translate.instant('success.create'), this.translate.instant('success.close'), {
          duration: 2000,
          horizontalPosition: 'right',
          panelClass: ['success-snack'],
        })
      });
    }
  }
  getErrorMessage(text: string, params: { length: number }): string {
    return this.translate.instant(text, params)
  }
}
