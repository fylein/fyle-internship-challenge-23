import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  userName: string = '';

  @Output() searchUserEvent = new EventEmitter<string>();

  searchUser() {
    this.searchUserEvent.emit(this.userName);
  }
}
