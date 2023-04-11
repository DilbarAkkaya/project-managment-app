import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { TodoItem } from 'src/app/models/todo.model';
import { BoardserviceService } from '../../services/board.service';
import { IBoardResponse, IColumnResponse } from 'src/app/models/api.model';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ColumnFormComponent } from '../../components/column-form/column-form.component';

@Component({
  selector: 'pma-selected-board-page',
  templateUrl: './selected-board-page.component.html',
  styleUrls: ['./selected-board-page.component.scss']
})
export class SelectedBoardPageComponent implements OnInit {
  sub: Subscription | undefined;
  board: IBoardResponse | undefined;
  boardId: string = '';
  columns: IColumnResponse[] =[];
  //todoList: TodoItem[] =[];
  constructor(private boardService: BoardserviceService, private route: ActivatedRoute, private dialog: MatDialog) {

  }
  /*   onAddTodo(item: TodoItem){
      this.todoList.push(item) */
      ngOnInit() {
        this.route.params.pipe(
          switchMap((params: Params) => {
            this.boardId = params['id'];
            return this.boardService.getBoardById(this.boardId);
          })
        ).subscribe((board: IBoardResponse) => {
          this.board = board;
          this.boardService.refresh$.subscribe(() => {
            this.getAllColumns(this.boardId);
          });
          this.getAllColumns(this.boardId);
        });
      }

      private getAllColumns(boardId:string) {
        this.boardService.getAllColumns(boardId).subscribe((columns: IColumnResponse[]) => {
          this.columns =columns;
        });
      }


      openCreateDialog() {
        const dialogRef = this.dialog.open(ColumnFormComponent, {
          data: { board: this.board, boardId: this.boardId }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result && result.clicked === 'submit') {
            console.log(result.form.value);
          }
        });
      }}

