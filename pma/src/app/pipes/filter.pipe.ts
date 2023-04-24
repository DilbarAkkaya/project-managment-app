import { Pipe, PipeTransform } from '@angular/core';
import { ITaskResponse } from '../models/api.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(tasks: ITaskResponse[], searchText: string): ITaskResponse[] {
    if (!tasks) return [];
    if (!searchText) return tasks;
    searchText = searchText.toLowerCase();
    return tasks.filter(task => task.title.toLowerCase().includes(searchText) || task.description.toLowerCase().includes(searchText));
  }
}
