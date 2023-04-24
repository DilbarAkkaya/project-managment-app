import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { TodoItem } from 'src/app/models/todo.model';
import { BoardserviceService } from '../../services/board.service';
import { IBoardResponse, IColumnResponse } from 'src/app/models/api.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ColumnFormComponent } from '../../components/column-form/column-form.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AuthserviceService } from '../../services/authservice.service';

@Component({
  selector: 'pma-selected-board-page',
  templateUrl: './selected-board-page.component.html',
  styleUrls: ['./selected-board-page.component.scss']
})
export class SelectedBoardPageComponent implements OnInit {
  @Output() moveColumns = new EventEmitter<string[]>();
  sub: Subscription | undefined;
  board: IBoardResponse | undefined;
  boardId: string = '';
  columns: IColumnResponse[] =[];
  searchText: string = '';

  //todoList: TodoItem[] =[];
  constructor(public apiservice: AuthserviceService, private boardService: BoardserviceService, private route: ActivatedRoute, private dialog: MatDialog, private router: Router) {

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
      }
      ondeleteColumn(id: string) {
        this.columns = this.columns.filter(column => column._id !== id);
      }

      onMoveColumn(event: CdkDragDrop<IColumnResponse[]>) {
        const prevColumns = this.columns;
        const currentColumns = prevColumns;
        const moveColumn = prevColumns[event.previousIndex];
        console.log(moveColumn)
        prevColumns.splice(event.previousIndex, 1);
        currentColumns.splice(event.currentIndex, 0, moveColumn);
        const columnId = currentColumns.map(c => c._id);
        this.columns = currentColumns;
        this.moveColumns.emit(columnId);
      }
      onSearchTextEntered(searchValue: string){
        this.searchText = searchValue;
        console.log('entered value', this.searchText)
      }
      backToMain(){
        this.router.navigate(['./auth/main']);
      }
    }

