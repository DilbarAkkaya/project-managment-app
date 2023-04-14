import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateComponent } from '../../components/modal-create/modal-create.component';
import { BoardserviceService } from '../../services/board.service';
import { IBoardResponse } from 'src/app/models/api.model';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pma-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy{
  boards: IBoardResponse[] = [];
  sub: Subscription | undefined;
  constructor(private boardService: BoardserviceService) { }


  ngOnInit() {
 /*    this.sub = this.boardService.getAllBoards().subscribe((boards: any) => {
      this.boards = boards;
    }) */
    this.boardService.refresh$.subscribe(()=>{
      this.getAllBoards();
    })
    this.getAllBoards();
  }
  private getAllBoards(){
    this.boardService.getAllBoards().subscribe((boards: IBoardResponse[])=> this.boards = boards)
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
