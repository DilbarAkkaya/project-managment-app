import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog: MatDialog) { }
  openConfirm(message: string){
    return this.dialog.open(ConfirmDialogComponent, {
      width: '23em',
      disableClose: true,
      data: {
        message: message,
      }
    })
  }
}
