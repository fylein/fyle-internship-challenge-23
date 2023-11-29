import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../services/api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
interface UserProfile {
  name: string;
  login: string;
  company?: string;
  location?: string;
  avatar_url: string;
  bio?: string;
  hireable?: boolean;
  blog?: string;
  email?: string;
  followers: number;
  following: number;
  public_gists: number;
  public_repos: number;
  html_url: string;
  twitter_username?: string;
}

@Component({
  selector: 'gg-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading: boolean = false;
  profile: UserProfile | null = null;
  repos: any[] = [];
  pageNumbers: number[] = [];
  username: string = '';
  currentPage = 1;
  pageSize = 10;
  maxPageSize = 100;
  pageSizeOptions = [10, 25, 50, 100];
  totalRepos: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private profileService: ProfileService) {}

  findProfile() {
    this.loading = true;
    this.profileService.updateProfile(this.username);

    this.profileService.getProfileInfo()
      .pipe(
        catchError((error) => {
          console.error('Error fetching profile:', error);
          this.loading = false;
          return throwError('An error occurred while fetching the profile.');
        })
      )
      .subscribe((profile: UserProfile) => {
        this.profile = profile;
        this.loading = false;
      });

    this.fetchRepos();
  }

  fetchRepos() {
    this.profileService.getProfileRepos(this.currentPage, this.pageSize)
      .pipe(
        catchError((error) => {
          console.error('Error fetching repos:', error);
          return throwError('An error occurred while fetching repositories.');
        })
      )
      .subscribe((repos) => {
        this.repos = repos;
        this.totalRepos = this.repos.length;
        this.updatePagination();
      });
  }

  updatePagination() {
    const totalPages = Math.ceil(this.totalRepos / this.pageSize);
    this.pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchRepos();
  }

  onPageSizeChange(event: any) {
    const newSize = event?.target?.value ? parseInt(event.target.value, 10) : 10;
    this.pageSize = newSize;
    this.currentPage = 1;
    this.fetchRepos();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchRepos();
    }
  }

  goToNextPage() {
    const nextPage = this.currentPage + 1;
    const totalPages = Math.ceil(this.totalRepos / this.pageSize);

    if (nextPage <= totalPages) {
      this.currentPage = nextPage;
      this.fetchRepos();
    }
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchRepos();
  }


  ngOnInit() {
    this.updatePagination();
  }
}