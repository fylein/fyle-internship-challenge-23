import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router) { }

  searchQuery: string = '';

  onSubmit() {
    this.router.navigate(['/user', this.searchQuery], {
      queryParams: { page: 1, per_page: 10 },
    });
  }
}
