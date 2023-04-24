import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BoardserviceService } from '../../services/board.service';
import { IBoardCreate, IBoardResponse } from 'src/app/models/api.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'pma-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {
  boards: IBoardResponse[] = [];
  constructor(private dialogRef: MatDialogRef<ModalCreateComponent>,  private snackBar: MatSnackBar, public translate: TranslateService, private boardservice: BoardserviceService) { }
  ngOnInit(): void {
  }
  errorMessage = '';
  errorMessageShow = false;
  createForm = new FormGroup({
    title: new FormControl('', Validators.required),
  })
  close() {
    this.dialogRef.close();
  }
  createSubmit(): void {
    if (this.createForm.valid) {
      const board: IBoardCreate = {
        title: this.createForm.value.title || null,
        owner: localStorage.getItem('owner') || null || undefined,
        users: ['']
      }
      this.boardservice.createBoard(board).subscribe((board) => {
        this.boards.push(board)
        this.dialogRef.close({ clicked: 'submit', form: this.createForm });
        this.snackBar.open(this.translate.instant('success.create'), this.translate.instant('success.close'), {
          duration: 2000,
          horizontalPosition: 'right',
          panelClass: ['success-snack'],
        })
      })
    }
  }
}
