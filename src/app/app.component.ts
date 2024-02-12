import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { SharedDataService } from './shared/shared-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  repoDetails: any;
  user: any;
  perPage: number = 10;
  pageNo: number = 1;
  userName: string = '';
  initialized: boolean = false;
  loader: boolean = false;

  constructor(
    private userData: ApiService,
    private userRepoData: ApiService,
    private sharedData: SharedDataService,
  ) {}

  ngOnInit(): void {
    this.subscribeToUserNameChanges();
  }

  private subscribeToUserNameChanges(): void {
    this.sharedData.searchedUser$.subscribe((name) => {
      this.userName = name;
      if (this.initialized) {
        this.loader = true;
        this.loadUserData();
      }
      this.initialized = true;
    });
  }
  private loadUserData(): void {
    this.userRepoData
      .getRepos(this.userName, this.pageNo, this.perPage)
      .subscribe((repoData) => {
        this.repoDetails = repoData;
        this.loader = false;
      });

    this.userData.getUser(this.userName).subscribe((userData) => {
      this.user = userData;
      this.loader = false;
    });
  }

  // handlePaginate(event: PageEvent) {
  //   this.pageNo = event.pageIndex + 1;
  //   this.perPage = event.pageSize;
  //   this.loadingSkeleton = true;
  //   this.loadUserData();
  // }
}
