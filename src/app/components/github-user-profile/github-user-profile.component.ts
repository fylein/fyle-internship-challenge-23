
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError, takeUntil } from 'rxjs/operators';
import {  ApiService } from '../../services/api.service';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-github-user-profile',
  templateUrl: './github-user-profile.component.html',
  styleUrls: ['./github-user-profile.component.scss']
})

export class GithubUserProfileComponent implements AfterViewInit, OnDestroy {
  inputSearch = new FormControl();
  githubUserDetails: any;
  notFound: boolean = false;
  loading: boolean = false;
  repoData: any;
  hasData: boolean = false;
  currentPage: number = 1;
  // per_page: number = 10;
  totalPages: number = 1;


    selectedItem: any = 10;
    items = [
      { label: '10', value: '10' },
      { label: '20', value: '20' },
      { label: '30', value: '30' },
      { label: '40', value: '40' },
      { label: '50', value: '50' },
      { label: '60', value: '60' },
      { label: '70', value: '70' },
      { label: '80', value: '80' },
      { label: '90', value: '90' },
      { label: '100', value: '100' }
    ];
  

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private apiService:  ApiService) {}

  

  ngAfterViewInit(): void {
    this.setupSearchInput();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearchInput(): void {
    this.inputSearch.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((userName: string) => {
          this.loading = true;

          if (userName.length) {
            return this.apiService.getGithubUserDetails(userName).pipe(
              catchError(() => of(null)),
              takeUntil(this.destroy$)
            );
          } else {
            this.loading = false;
            return of(null);
          }
        })
      )
      .subscribe((res: any) => {
        this.handleUserDetailsResponse(res);
      },
    (error:any)=>{
      console.log('error here is ; ',error)
    }
      );
  }

  private handleUserDetailsResponse(res: any): void {
    if(!res){
      this.loading = false;
      this.notFound = true;
      this.hasData = false;
      this.githubUserDetails = null
      return;
    }
   
    if (res?.message) {
      this.loading = false
      this.notFound = true;
      this.githubUserDetails = null;
    } else {
      this.notFound = false;
      this.githubUserDetails = res;
      this.totalPages = Math.ceil(Number(this.githubUserDetails.public_repos) / this.selectedItem);

      this.fetchUserRepos();
    }

    this.loading = false;
  }

  private fetchUserRepos(): void {
    if (this.githubUserDetails) {
      this.apiService.getUserRepos(this.githubUserDetails.repos_url, this.currentPage, this.selectedItem)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            this.repoData = res;
            this.hasData = true;
          },
          (error) => {
            console.error('Error fetching user repos:', error);
          }
        );
    }
  }

  loadPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.fetchUserRepos();
    }
  }
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}

