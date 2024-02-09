import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponent {
  searchQuery: string = '';
  isInputError: boolean = false;
  inputErrorMessage: string = '';

  constructor(private router: Router) { }

  onSubmit(event: Event) {
    if (this.searchQuery.trim() === '') {
      this.isInputError = true;
      this.inputErrorMessage = 'Username cannot be empty.';
      return;
    }

    if (this.searchQuery.trim().includes(' ')) {
      this.isInputError = true;
      this.inputErrorMessage = 'Username contains space.';
      return;
    }

    this.isInputError = false;
    this.inputErrorMessage = '';
    this.router.navigate(['/user', this.searchQuery], {
      queryParams: { page: 1, per_page: 10 },
    });
  }

}
