import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  userData: any=null;
  userRepos: any=[];
  page: number = 1;
  pageSize: number = 10;
  username: string = '';
  loading: boolean = false;
  loadingRepos: boolean = false;
  error: string = '';
  constructor(
    private apiService: ApiService,
    private cdf: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
      
  }
  
  fetchUserDetails() {
    this.loading = true;
    this.error = '';
    this.loadingRepos = true;
    this.apiService.getUser(this.username).subscribe((data: any) => {
      this.userData = data
      this.loading = false;
      console.log(this.userData);
    },
      (err: any) => {
        // if(err.)
        if (err.status === 404) {
          this.error = 'User not found';
        }
        this.userData = null;
        this.userRepos = [];
        this.loading = false;
        this.loadingRepos = false;
      }
    )
    this.fetchUserRepos();
  }
  fetchUserRepos() {
    console.log(this.page, this.pageSize);
    this.loadingRepos = true;
    this.apiService.getRepos(this.username, this.page, this.pageSize).subscribe((data: any) => {
      this.userRepos = data;
      console.log(this.userRepos);
      this.cdf.detectChanges();
      this.loadingRepos = false;
    },
      (err: Error) => {
        this.userRepos = [];
        this.loadingRepos = false;
      }
    );
  }
  ngOnChanges() {
    console.log(this.userData);
  }
  onPageChange(page: number) {
    this.page = page;
    console.log(this.page);
    this.fetchUserRepos();
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.fetchUserRepos();
  }
}
