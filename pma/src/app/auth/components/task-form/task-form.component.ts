import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { BoardserviceService } from '../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBoardResponse, IColumnCreate, IColumnResponse, ITaskCreate, ITaskResponse } from 'src/app/models/api.model';

@Component({
  selector: 'pma-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit{
  boardId: string ='';
  columnId: string ='';
  constructor(private dialogRef: MatDialogRef<ModalCreateComponent>, private boardService: BoardserviceService, private route: ActivatedRoute, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { boardId: string, columnId: string}){

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
        console.log('i am column', task)
        this.dialogRef.close({ clicked: 'submit', form: this.createForm });
      });
    }
  }
}