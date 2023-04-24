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

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue)
  }

}
