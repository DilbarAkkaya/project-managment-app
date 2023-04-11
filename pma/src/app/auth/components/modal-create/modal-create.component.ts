import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardserviceService } from '../../services/board.service';
import { IBoardCreate, IBoardResponse } from 'src/app/models/api.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'pma-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit{
  boards: IBoardResponse[] =[];
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
        owner: localStorage.getItem('owner') || null || undefined,
        users: ['']
      }
        this.boardservice.createBoard(board).pipe(
          switchMap(() => this.boardservice.getAllBoards())
        ).subscribe((boards) => {
          this.boards = boards as IBoardResponse[];
          this.dialogRef.close({ clicked: 'submit', form: this.createForm });
        }, (error: any) => {
          console.error('Error submitting form data:', error);
        });
      }
/*

      this.boardservice.createBoard(board).subscribe((response: any) => {
        console.log('Form data submitted successfully:', response);
        this.dialogRef.close({ clicked: 'submit', form: this.createForm });
      }, (error: any) => {
        console.error('Error submitting form data:', error);
      });
    } */
  }
}
