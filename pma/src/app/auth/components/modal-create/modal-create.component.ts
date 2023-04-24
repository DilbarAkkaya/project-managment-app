import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BoardserviceService } from '../../services/board.service';
import { IBoardCreate, IBoardResponse } from 'src/app/models/api.model';

@Component({
  selector: 'pma-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {
  boards: IBoardResponse[] = [];
  constructor(private dialogRef: MatDialogRef<ModalCreateComponent>, private boardservice: BoardserviceService) { }
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
      })
    }
  }
}
