import { Component, Input, OnInit } from '@angular/core';
import { BoardserviceService } from '../../services/board.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBoardResponse, IColumnCreate, IColumnResponse } from 'src/app/models/api.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Inject } from '@angular/core';

@Component({
  selector: 'pma-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss']
})
export class ColumnFormComponent implements OnInit{
  board: IBoardResponse | undefined;
  boardId: string = '';

  constructor(private dialogRef: MatDialogRef<ModalCreateComponent>, private boardservice: BoardserviceService, private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { board: IBoardResponse, boardId: string }) {
      this.board = data.board;
      this.boardId = data.boardId;
  }

  errorMessage = '';
  errorMessageShow = false;
  createForm = new FormGroup({
    title: new FormControl('', Validators.required),
  })

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

  createSubmit(): void {
    if (this.createForm.valid && this.boardId) {
      const column: IColumnCreate = {
        title: this.createForm.value.title || null,
        order: 0,
      }
      this.boardservice.createColumn(this.boardId, column).subscribe((column: IColumnResponse) => {
        column = column;
        this.dialogRef.close({ clicked: 'submit', form: this.createForm });
      });
    }
  }
}
