import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  user: any = null; // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  repo: any = null;
  constructor(private apiService: ApiService) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.apiService.getUser('johnpapa').subscribe((user: any) => {
      this.user = user;
    });
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.apiService.getRepos('johnpapa').subscribe((repos: any) => {
      this.repo = repos;
    });
  }
}
