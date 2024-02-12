import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
  user: any = null;
  repo: any = null;
  constructor(private apiService: ApiService) {
    this.apiService.getUser('johnpapa').subscribe((user: any) => {
      console.log(user);
      this.user = user;
    });

    this.apiService.getRepos('johnpapa').subscribe((repos: any) => {
      this.repo = repos;
    });
  }
}
