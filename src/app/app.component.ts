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
    this.apiService.getUser(this.username).subscribe({
      next: (data: any) => {
        this.userData = data;
        console.log(this.userData);
        this.cdf.detectChanges();
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'User not found';
        this.userData = null;
        this.loading = false;
    }
    });
    this.fetchUserRepos();
  }
  fetchUserRepos() {
    console.log(this.page, this.pageSize);
    this.loadingRepos = true;
    this.apiService.getRepos(this.username, this.page, this.pageSize).subscribe({
      next: (data: any) => {
        this.userRepos = data;
        console.log(this.userRepos);
        this.cdf.detectChanges();
        this.loadingRepos = false;
      },
      error: (err: any) => {
        this.userRepos = [];
        this.loadingRepos = false;
      }
    });
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
