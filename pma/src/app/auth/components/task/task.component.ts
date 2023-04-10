import { Component, Input } from '@angular/core';
import { ITaskResponse } from 'src/app/models/api.model';

@Component({
  selector: 'pma-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task: ITaskResponse | undefined;
}
