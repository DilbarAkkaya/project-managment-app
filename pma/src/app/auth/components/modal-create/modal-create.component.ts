import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardserviceService } from '../../services/boardservice.service';
import { IBoardCreate } from 'src/app/models/api.model';

@Component({
  selector: 'pma-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit{
  constructor(private dialogRef: MatDialogRef<ModalCreateComponent>, private boardservice: BoardserviceService) { }
  ngOnInit(): void {

  }
  errorMessage = '';
  errorMessageShow = false;
  createForm = new FormGroup({
    title: new FormControl('', Validators.required),
/*     login: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]) */
  })
   close() {
    this.dialogRef.close();
  }

  createSubmit(): void {
    if (this.createForm.valid) {
      const board: IBoardCreate = {
        title: this.createForm.value.title || null,
        owner: 'fsgdfgfg',
        users: ['dgfgdf']
      }

      this.boardservice.createBoard(board).subscribe((response: any) => {
        console.log('Form data submitted successfully:', response);
        this.dialogRef.close({ clicked: 'submit', form: this.createForm });
      }, (error: any) => {
        console.error('Error submitting form data:', error);
      });
    }
  }
}
