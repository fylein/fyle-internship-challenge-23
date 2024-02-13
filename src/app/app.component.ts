import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { UserDetailsComponent } from './components/user-details/user-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userDetails: any;
  repositories: any[] = [];
  loading = false;
  error = false;

  constructor(private apiService: ApiService) {}

  onSearch(username: string) {
    this.loading = true;
    this.apiService.getUser(username).subscribe(
      (user) => {
        this.userDetails = user;
        this.loading = false;
      },
      () => {
        this.userDetails = null;
        this.loading = false;
      }
    );

    this.apiService.getRepos(username, 1, 1000).subscribe(
      (repos) => {
        this.repositories = repos;
        this.loading = false;
      },
      () => {
        this.repositories = [];
        this.loading = false;
        this.error = true;
      }
    );
  }
}
