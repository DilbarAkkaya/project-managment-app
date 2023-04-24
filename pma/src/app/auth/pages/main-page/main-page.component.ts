import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { BoardserviceService } from '../../services/board.service';
import { IBoardResponse } from 'src/app/models/api.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pma-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  boards: IBoardResponse[] = [];
  sub: Subscription | undefined;
  searchText: string = '';
  constructor(private boardService: BoardserviceService, public apiservice: AuthserviceService,) { }
  ngOnInit() {
    this.boardService.refresh$.subscribe(() => {
      this.getAllBoards();
    })
    this.getAllBoards();
  }
  private getAllBoards() {
    this.boardService.getAllBoards().subscribe((boards: IBoardResponse[]) => this.boards = boards)
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
