import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pma-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent {
  constructor(private dialogRef: MatDialogRef<ModalCreateComponent>) { }

  close() {
    this.dialogRef.close();
  }
}
