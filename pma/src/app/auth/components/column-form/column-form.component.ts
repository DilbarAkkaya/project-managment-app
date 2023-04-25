import { Component, OnInit } from '@angular/core';
import { BoardserviceService } from '../../services/board.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBoardResponse, IColumnCreate, IColumnResponse } from 'src/app/models/api.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pma-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss']
})
export class ColumnFormComponent implements OnInit {
  board: IBoardResponse | undefined;
  boardId: string = '';
  columns: IColumnResponse[] = [];
  constructor(private dialogRef: MatDialogRef<ModalCreateComponent>, private snackBar: MatSnackBar, private translate: TranslateService, private boardservice: BoardserviceService, private route: ActivatedRoute,
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
      this.boardservice.getAllColumns(this.boardId).subscribe((columns: IColumnResponse[]) => {
        const maxOrder = Math.max(...columns.map(column => column.order));
        const column: IColumnCreate = {
          title: this.createForm.value.title || null,
          order: maxOrder + 1,
        };
        this.boardservice.createColumn(this.boardId, column).subscribe((column: IColumnResponse) => {
          this.columns.push(column);
          this.dialogRef.close({ clicked: 'submit', form: this.createForm });
          this.snackBar.open(this.translate.instant('success.create'), this.translate.instant('success.close'), {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass: ['success-snack'],
          });
        });
      });
    }
  }
}
