import { Component, OnInit, Inject } from '@angular/core';
import { ITaskResponse, IUpdateTask } from 'src/app/models/api.model';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoardserviceService } from '../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'pma-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss']
})
export class TaskUpdateComponent implements OnInit {
  boardId: string = '';
  columnId: string = '';
  taskId: string = '';
  tasks: ITaskResponse[] = [];
  updateForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })
  constructor(private dialogRef: MatDialogRef<ModalCreateComponent>, private translateService: TranslateService, private boardService: BoardserviceService, private route: ActivatedRoute, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { boardId: string, columnId: string, id: string }) {
    this.boardId = data.boardId,
      this.columnId = data.columnId,
      this.taskId = data.id
  }
  ngOnInit(): void {
  }
  updateSubmit(): void {
    if (this.updateForm.valid && this.boardId) {
      const task: IUpdateTask = {
        title: this.updateForm.value.title!,
        description: this.updateForm.value.description!,
        order: 0,
        userId: 0,
        columnId: this.columnId,
        users: [''],
      }
      this.boardService.updateTaskById(this.boardId, this.columnId, this.taskId, task).subscribe((updatedTask) => {
        this.dialogRef.close({ task: updatedTask });
      });
    }
  }
  getErrorMessage(text: string, params: { length: number }): string {
    return this.translateService.instant(text, params)
  }
}
