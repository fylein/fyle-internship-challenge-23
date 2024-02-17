import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
})
export class UserInputComponent {
  // Input properties
  @Input() appTheme: string = 'light';
  @Output() searchResult = new EventEmitter<any>();

  username: string = '';

  /**
   * @brief Emits the search result to the parent component.
   */
  emitSearchResult(): void {
    this.searchResult.emit({
      username: this.username,
    });
  }
}
