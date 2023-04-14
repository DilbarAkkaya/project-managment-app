import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IBoardResponse } from 'src/app/models/api.model';
import { BoardserviceService } from '../../services/board.service';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';

@Component({
  selector: 'pma-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent {
  @Input() board: IBoardResponse | undefined;
  @Output() boardDeleted = new EventEmitter<string>();

  constructor(private router: Router, private boardservice: BoardserviceService, private dialogservice: ConfirmDialogService){}
  openBoard(id: string|undefined){
    this.router.navigate([`./auth/selected-board/${id}`]);
  }
  deleteBoard(event: Event) {
   /*  event.stopPropagation();
    this.boardservice.deleteBoardById(this.board!._id).subscribe(() => {
      this.boardDeleted.emit(this.board!._id);
    }); */
    event.stopPropagation();
    this.dialogservice.openConfirm("delete this board").afterClosed().subscribe(response => {
      if(response) {
        this.boardservice.deleteBoardById(this.board!._id).subscribe(() => {
          this.boardDeleted.emit(this.board!._id);
        })
      }
    })
  }
}
