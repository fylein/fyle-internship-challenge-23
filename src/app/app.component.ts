import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  userName!: string;
  userDetails!: any;
  userVaild!: boolean;
  userErrorMsg!: string;
  userReposShowcase!: any;
  userRepos!: any;
  skeletonLoader!: boolean;
  checkUserDetails: boolean = false;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const getUserName = localStorage.getItem("name");
    if (getUserName !== null) {
      this.userName = getUserName;
      this.checkUserDetailsMethod()
      this.searchUser(getUserName, 10);
    }
  }

  getRepos(event: any, showcase: boolean): void {
    this.skeletonLoader = true;
    this.apiService.getRepos(this.userName, event?.pageIndex + 1, event?.pageSize).subscribe((repoRes: any) => {
      (showcase) ? this.userReposShowcase = repoRes : this.userRepos = repoRes;
    }, (error: any) => {
      error.message = "Repos not found",
        this.skeletonLoader = false;

    });
    this.skeletonLoader = false;
  }

  searchUser(name: string, repos: number) {
    this.skeletonLoader = true;
    if (name) {
      this.userVaild = false;

      this.apiService.getUser(name).subscribe(
        (res) => {
          this.userVaild = true;
          this.userDetails = res;
          this.skeletonLoader = false;
          this.getRepos({
            "length": this.userDetails?.public_repos,
            "pageIndex": 0,
            "pageSize": 5
          }, true)
        }, (error) => {
          this.userErrorMsg = "User not found";
          this.skeletonLoader = false;
          this.userVaild = false;
        });
    } else {
      this.userErrorMsg = "Input is Empty";
      this.skeletonLoader = false;
      this.userVaild = false;
    }
  }

  checkUserDetailsMethod() {
    if (this.checkUserDetails) {
      this.checkUserDetails = false;
      localStorage.removeItem("name");
    } else {
      this.checkUserDetails = true;
      localStorage.setItem("name", this.userName);
      this.getRepos({
        "length": this.userDetails?.public_repos,
        "pageIndex": 0,
        "pageSize": 10
      }, false);
    }
  }
}
