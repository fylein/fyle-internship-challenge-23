import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  searchQuery: string = '';
  @Input() githubUsername: string = '';
  @Output() typedUsername = new EventEmitter<string>();
  processQuery() {
    this.typedUsername.emit(this.searchQuery);
  }
}
