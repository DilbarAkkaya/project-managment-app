import { Component, Input } from '@angular/core';
import { IBoardResponse } from 'src/app/models/api.model';

@Component({
  selector: 'pma-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent {
  @Input() boards: IBoardResponse[] = [];
  ondeleteBoard(boardId: string) {
    this.boards = this.boards.filter((board) => board._id !== boardId);
  }
}
