import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  searchQuery: string = '';
  @Output() username = new EventEmitter<string>();

  onSubmit() {
    this.username.emit(this.searchQuery);
    this.router.navigate(['/user', this.searchQuery], {
      queryParams: { page: 1, per_page: 10 },
    });
  }
}
