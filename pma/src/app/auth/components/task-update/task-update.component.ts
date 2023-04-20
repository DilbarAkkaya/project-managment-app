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
  boardId: string ='';
  columnId: string ='';
  taskId: string = '';
  tasks: ITaskResponse[] = [];
  constructor(private dialogRef: MatDialogRef<ModalCreateComponent>, private translateService: TranslateService, private boardService: BoardserviceService, private route: ActivatedRoute, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { boardId: string, columnId: string, id: string}){
      this.boardId = data.boardId,
      this.columnId = data.columnId,
      this.taskId = data.id
    }

  updateForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })
  ngOnInit(): void {

  }
  updateSubmit(): void {
    console.log(this.columnId)
    console.log(this.boardId)
    console.log(this.taskId)
    if (this.updateForm.valid && this.boardId) {
      const task: IUpdateTask = {
        title: this.updateForm.value.title!,
        description: this.updateForm.value.description!,
        order: 0,
        userId: 0,
        columnId: this.columnId,
        users: [''],
      }
console.log('columnid', this.columnId)
this.boardService.updateTaskById(this.boardId, this.columnId, this.taskId, task).subscribe((updatedTask) => {
  console.log('Updated:', updatedTask);
  this.dialogRef.close({task: updatedTask});
});
    }
  }
  getErrorMessage(text: string, params: { length: number }): string {
    return this.translateService.instant(text, params)
    //return (this.signupForm.value.password!.length < 7) ? 'Your password should be min 7 chars' : '';
  }
/*   getErrorMessage() {
    return (this.updateForm.value.title!.length < 16) ? 'Title is required and should be max 15 chars' : '';
  } */
}
