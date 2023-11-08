import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Observable, range, of } from 'rxjs';
import { USER_INFO, REPO } from './services/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.showSkeleton = true;
  }

  title: string = 'fyle-frontend-challenge';
  userName: string = '';
  user$: USER_INFO = {
    login: '',
    bio: '',
    location: '',
    twitter_user: '',
  };
  repos$!: Observable<REPO[]>;
  _repos: REPO[] = [];
  isLoaded: boolean = true;
  showSkeleton!: boolean;
  perPage = 6;
  pageNo: number = 1;
  offSet = 0;
  noOfPages$!: Observable<number[]>;
  selectedPage = 1;

  
  handleChange(name: string) {
    this.isLoaded = false;
    this.userName = name;
    this.apiService.getUser(this.userName).subscribe((user: any) => {
      this.isLoaded = true;
      this.showSkeleton = false;
      this.user$ = {
        login: user.login,
        bio: user.bio,
        location: user.location,
        twitter_user: user.twitter_user,
      };
    });
    this.getRepos();
  }
  /*  renderPage(event: number) {
    this.pagination = event;
    this.getRepos();
  } */

  getRepos() {
    this.apiService.getRepo(this.userName).subscribe((repos: any) => {
      Object.entries(repos).forEach((repo: any) => {
        this._repos.push({
          name: repo[1].name,
          language: repo[1].language,
          description: repo[1].description,
        });
      });
      this.repos$ = of(
        this._repos.slice(this.offSet, this.perPage * this.pageNo)
      );
      let range$: number[] = [];
      range(1, Object.entries(repos).length / this.perPage).subscribe((val) =>
        range$.push(val)
      );
      this.noOfPages$ = of(range$);
    });
  }
  setRepos(page: number) {
    this.selectedPage = page;
    this.offSet = this.perPage * (page - 1);
    this.repos$ = of([]);
    this.repos$ = of(this._repos.slice(this.offSet, this.perPage * page));
  }
}
