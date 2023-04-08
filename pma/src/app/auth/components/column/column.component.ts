import { Component } from '@angular/core';
import { BoardserviceService } from '../../services/board.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pma-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
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
      const column: IColumnCreate = {
        title: this.createForm.value.title || null,
        owner: localStorage.getItem('owner') || null || undefined,
        users: ['']
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
