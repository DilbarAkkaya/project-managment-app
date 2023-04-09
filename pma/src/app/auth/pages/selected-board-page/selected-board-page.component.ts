import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { TodoItem } from 'src/app/models/todo.model';
import { BoardserviceService } from '../../services/board.service';
import { IBoardResponse } from 'src/app/models/api.model';
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
  //todoList: TodoItem[] =[];
  constructor(private boardService: BoardserviceService, private route: ActivatedRoute, private dialog: MatDialog) {

  }
  /*   onAddTodo(item: TodoItem){
      this.todoList.push(item) */
      ngOnInit() {
        this.route.params.pipe(
          switchMap((params: Params) => {
            this.boardId = params['id'];
            localStorage.setItem('boardId', this.boardId)
            console.log('params', this.boardId)
            return this.boardService.getBoardById(this.boardId).pipe(
              switchMap((board: IBoardResponse) => {
                console.log('board', board);
                this.board = board;
                console.log(this.board._id, '5555555')
                return this.boardService.getAllColumns(this.boardId);
              })
            );
          })
        ).subscribe((columns) => {
          console.log('columns', columns);
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

