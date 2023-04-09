import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IColumnResponse } from 'src/app/models/api.model';

@Component({
  selector: 'pma-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
   @Input() column: IColumnResponse | undefined;
/*   constructor(private router: Router){}
  openBoard(id: string|undefined){
    this.router.navigate([`./auth/selected-board/${id}`]);
  } */
}
