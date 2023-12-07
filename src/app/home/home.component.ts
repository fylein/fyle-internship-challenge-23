import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private router: Router,
    // private apiService: ApiService
    ) 
    { }

  searchQuery: string = '';

  onSubmit() {
    // this.apiService.setUsername(this.searchQuery);
    console.log(this.searchQuery)
    this.router.navigate(['/user', this.searchQuery], {
      queryParams: { page: 1, per_page: 10 },
    });
  }
}
