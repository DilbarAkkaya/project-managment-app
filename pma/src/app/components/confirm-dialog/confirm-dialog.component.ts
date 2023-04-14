import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pma-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit{
  constructor( @Inject(MAT_DIALOG_DATA) public data: {message: string}, public dialogRef: MatDialogRef<ConfirmDialogComponent>){

  }
  ngOnInit(): void {

  }
closeConfirm(){
 this.dialogRef.close(false);
}
}
