import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IBoardResponse } from 'src/app/models/api.model';

@Component({
  selector: 'pma-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent {
  @Input() board: IBoardResponse | undefined;
  constructor(private router: Router){}
  openBoard(id: string|undefined){
    this.router.navigate([`./auth/selected-board/${id}`]);
  }
}
