import { Component, Input, OnInit } from '@angular/core';
import { BoardserviceService } from '../../services/board.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBoardResponse, IColumnCreate, IColumnResponse } from 'src/app/models/api.model';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'pma-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss']
})
export class ColumnFormComponent implements OnInit{
  @Input() board: IBoardResponse | undefined;
  constructor(private dialogRef: MatDialogRef<ModalCreateComponent>, private boardservice: BoardserviceService, private route: ActivatedRoute) { }
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
        order: 0,
      }
      this.route.params.pipe(switchMap((params: Params) => this.boardservice.createColumn(`${params['id']}`, column)
      )).subscribe((column: IColumnResponse) => {
        console.log('i am column', column)
        this.dialogRef.close({ clicked: 'submit', form: this.createForm });
      })
    }
  }
}
