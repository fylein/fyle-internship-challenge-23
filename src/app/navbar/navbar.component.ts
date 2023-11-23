import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  searchQuery: string = '';
  @Output() typedUsername = new EventEmitter<string>();
  @Input() showSearch: boolean = false;

  constructor(private route: Router) {}

  processQuery() {
    this.typedUsername.emit(this.searchQuery);
    this.route.navigate(['/users', this.searchQuery]);
  }
}
