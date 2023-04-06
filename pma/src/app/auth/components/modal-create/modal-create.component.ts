import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pma-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit{
  constructor(private dialogRef: MatDialogRef<ModalCreateComponent>) { }
  ngOnInit(): void {

  }
  errorMessage = '';
  errorMessageShow = false;
  createForm = new FormGroup({
    title: new FormControl('', Validators.required),
/*     login: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]) */
  })
/*   close() {
    this.dialogRef.close();
  } */
  createSubmit(){
    this.dialogRef.close({
    clicked: 'submit',
    form: this.createForm
  });}
}
