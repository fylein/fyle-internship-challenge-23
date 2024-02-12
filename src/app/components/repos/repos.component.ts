import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  repo: any = null;

  constructor(private apiService: ApiService) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.apiService.getRepos('johnpapa').subscribe((repos: any) => {
      this.repo = repos;
    });
  }
}
