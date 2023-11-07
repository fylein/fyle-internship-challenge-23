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
  title: string = 'fyle-frontend-challenge';
  userName: string = '';
  user$: USER_INFO = {
    login: '',
    bio: '',
    location: '',
    twitter_user: '',
  };
  repos$!: Observable<REPO[]>;
  isLoaded: boolean = true;
  showSkeleton!: boolean;
  perPage = 6;
  noOfPages$!: Observable<number[]>;
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.showSkeleton = true;
  }

  handleChange(name: string) {
    this.isLoaded = false;
    this.userName = name;
    console.log(this.userName);
    this.apiService.getUser(this.userName).subscribe((user: any) => {
      console.log(user);
      this.isLoaded = true;
      this.showSkeleton = false;
      this.user$ = {
        login: user.login,
        bio: user.bio,
        location: user.location,
        twitter_user: user.twitter_user,
      };
    });
    this.apiService.getRepo(this.userName).subscribe((repos: any) => {
      let _repos: REPO[] = [];
      Object.entries(repos).forEach((repo: any) => {
        _repos.push({
          name: repo[1].name,
          language: repo[1].language,
          description: repo[1].description,
        });
      });
      this.repos$ = of(_repos);
      let range$:number[]=[];
      range(1, Object.entries(repos).length / this.perPage)
      .subscribe(val=>range$.push(val));
      this.noOfPages$=of(range$);
    });
  }
}
