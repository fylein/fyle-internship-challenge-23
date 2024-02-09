import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { ReposListComponent } from '../repos-list/repos-list.component';
import { FormControl, FormsModule } from '@angular/forms';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { User } from 'src/models/user.model';
import { Repo } from 'src/models/repo.model';
import { SkeletonUserCardComponent } from '../skeleton-user-card/skeleton-user-card.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    UserFormComponent,
    ReposListComponent,
    FormsModule,
    UserCardComponent,
    PaginationComponent,
    SkeletonUserCardComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  username: string = '';
  user!: User;
  repos: Repo[] = [];
  error: any;
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10;
  totalPagesArray: number[] = [];
  itemsPerPage: number = 10;
  isLoading: boolean = false;
  isProfileLoading: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  getUserProfile(username: string) {
    this.isProfileLoading = true;
    this.username = username;
    this.apiService.getUser(this.username).subscribe({
      next: (user) => {
        this.error = '';
        this.user = user;
        const totalRepos = user.public_repos;
        this.totalPages = Math.ceil(totalRepos / this.perPage);
        this.totalPagesArray = Array.from(
          { length: this.totalPages },
          (_, i) => i + 1
        );
        this.getUserRepos();
        this.isProfileLoading = false;
      },
      error: (error) => {
        this.error = 'Error fetching user profile';
        console.log('error'); // Log the error for debugging
        this.isProfileLoading = false;
      },
    });
  }

  getUserRepos() {
    if (!this.user) {
      return;
    }
    this.isLoading = true;
    this.apiService
      .getRepos(this.username, this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (repos) => {
          this.repos = repos;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Error fetching user profile';
          console.log('error'); // Log the error for debugging
          this.isProfileLoading = false;
        },
      });
  }

  changePage(pageNum: number | string) {
    if (pageNum === '...') {
      return;
    }
    if (typeof pageNum === 'number') {
      this.currentPage = pageNum;
      this.getUserRepos();
    }
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.getUserRepos();
  }
}
