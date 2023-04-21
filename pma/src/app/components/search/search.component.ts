import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pma-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  enteredSearchValue = '';
  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter();

  onSearchTextChanged(){
    console.log(this.enteredSearchValue)
    this.searchTextChanged.emit(this.enteredSearchValue)
  }

}
