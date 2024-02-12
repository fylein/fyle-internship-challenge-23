import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  title: string = 'fyle-frontend-challenge';
  repos: any;
  username: string = '';
  userData: any = {
    public_repos: 0,
  };

  numberOfReposOptions = [5, 10, 20, 50, 100];
  totalRepos!: number;
  reposPerPage = 5;
  currentPage = 1;

  ngOnInit() {
    this.totalRepos = this.userData.public_repos || 0;

    this.reposPerPage = 5;
    this.currentPage = 1;
  }
  ngOnChanges() {
    this.fetchBio();
    this.fetchRepos();
  }

  fetchBio(): void {
    this.apiService.getBio(this.username).subscribe((data) => {
      this.userData = data;
      this.totalRepos = this.userData.public_repos;
    });
  }

  fetchRepos() {
    this.apiService
      .getUser(this.username, this.currentPage, this.reposPerPage)
      .subscribe((res: any) => {
        this.repos = res;
      });
  }

  onSubmit() {
    if (this.username.length > 0) {
      this.fetchBio();
      this.fetchRepos();
    }
  }
  onChangeNumberOfRepos(option: number) {
    this.reposPerPage = option;
    console.log(this.reposPerPage, option);
  }

  onPageChanged(event: any) {
    this.currentPage = event;

    this.fetchRepos();
  }
}
