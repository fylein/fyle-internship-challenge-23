import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../list/list.component';
import { FormControl, FormsModule } from '@angular/forms';
import { FormComponent } from '../form/form.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { User } from 'src/assets/user.asset';
import { Repo } from 'src/assets/repo.asset';
import { LoadingUserCardComponent } from '../loading-user-card/loading-user-card.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    ListComponent,
    FormsModule,
    UserComponent,
    PaginationComponent,
    LoadingUserCardComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent {
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