import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { SharedDataService } from '../shared/shared-data.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  repoDetails: any;
  userDetails: any;
  perPage: number = 10; 
  pageNo: number =1; 
  userName: string = ''; 
  initialized: boolean = false; 
  loadingSkeleton: boolean = false;

  constructor(private userData: ApiService, private userRepoData: ApiService, private sharedData: SharedDataService) { }

  ngOnInit(): void {
    this.subscribeToUserNameChanges();
  }

  private subscribeToUserNameChanges(): void {
    this.sharedData.searchedUser$.subscribe(name => {
      this.userName = name; 
      if (this.initialized) {
        this.loadingSkeleton = true;
        this.loadUserData(); 
      }
      this.initialized = true; 
    });
  }

  private loadUserData(): void {
   
    this.userRepoData.getRepo(this.userName, this.pageNo, this.perPage).subscribe((repoData) => {
      this.repoDetails = repoData;
      this.loadingSkeleton = false;
    });

    this.userData.getUser(this.userName).subscribe((userData) => {
      this.userDetails = userData;
      this.loadingSkeleton=false;
    });
  }

  handlePaginate(event: PageEvent) {
    this.pageNo = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.loadingSkeleton = true;
    this.loadUserData(); 
  }
}
