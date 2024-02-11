import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  isLoading: boolean = false;
  user: any;
  errorMessage: string = '';

  @Output() githubUser = new EventEmitter<any>();
  constructor(private apiService: ApiService, private router: Router) {}

  searchUser(event: Event, username: string) {
    event.preventDefault();
    if (username) {
      this.isLoading = true;
      this.apiService.getUser(username).subscribe({
        next: (data) => {
          this.user = data;
          this.errorMessage = '';
          this.isLoading = false;

          if (this.user) {
            this.apiService.user = this.user;
            this.router.navigate(['user-info']);
          }
        },
        error: (error) => {
          this.user = null;
          this.errorMessage = 'User not found!';
          this.isLoading = false;
          console.error('API error : ', error);
          this.router.navigate(['not-found']);
        },
        complete: () => {
          console.log('User fetched!');
        },
      });
    }
  }
}
