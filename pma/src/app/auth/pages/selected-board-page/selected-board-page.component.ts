import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { TodoItem } from 'src/app/models/todo.model';
import { BoardserviceService } from '../../services/board.service';
import { IBoardResponse } from 'src/app/models/api.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'pma-selected-board-page',
  templateUrl: './selected-board-page.component.html',
  styleUrls: ['./selected-board-page.component.scss']
})
export class SelectedBoardPageComponent implements OnInit{
  sub: Subscription | undefined;
  board: IBoardResponse | undefined;
  //todoList: TodoItem[] =[];
  constructor(private boardService: BoardserviceService, private route: ActivatedRoute){

  }
/*   onAddTodo(item: TodoItem){
    this.todoList.push(item) */
    ngOnInit() {
this.route.params.pipe(switchMap((params: Params) => this.boardService.getBoardById(params['id'])
)).subscribe((board: IBoardResponse) => {
  console.log('board', board)
  this.board = board;
})
}}
/*       if (this.board && this.board._id){

        this.sub = this.boardService.getBoardById(this.board?._id).subscribe((board: IBoardResponse) => {
          this.board = board;
          console.log(this.board)
      }) */
