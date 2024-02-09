import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiService, GitHubUser, GitHubRepository } from 'src/app/services/api.service';
import { PaginationService } from 'src/app/services/pagination-services/pagination-services.service';

@Component({
  selector: 'repositories-component',
  templateUrl: './repositories-component.component.html',
  styleUrls: ['./repositories-component.component.scss']
})
export class RepositoriesComponent implements OnInit, OnDestroy, OnChanges {
  @Input() username: string = '';
  @Input() loading: boolean = true;
  loadingPageChange: boolean = false;
  reposCount: number = 0;
  reposPerPage: number = 0;
  currentPage: number = 0;
  userData: GitHubUser = {
    name: '',
    bio: '',
    location: '',
    twitter_username: '',
    html_url: '',
    avatar_url: '',
    public_repos: 0
  };

  reposData: GitHubRepository[] = [];
  newCurrentPage: number = 0;
  githubSubscription!: Subscription;
  reposCountSubscription!: Subscription;
  paginationPerPageSubscription!: Subscription;
  paginationCurrentPageSubscription!: Subscription;
  error404Subscription!: Subscription;
  error404: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page']);
      this.reposPerPage = Number(params['per_page']);
      this.fetchRepos();
    });

    this.paginationPerPageSubscription = this.paginationService
    .getSelectedPerPage()
    .subscribe((selectedPerPage) => {
      this.loadingPageChange = true;
      this.currentPage = 1;
      this.reposPerPage = Number(selectedPerPage);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: 1, per_page: this.reposPerPage },
        queryParamsHandling: 'merge',
      });
    });

    this.paginationCurrentPageSubscription = this.paginationService
    .getSelectedCurrentPage()
    .subscribe(selectedCurrentPage => {
      this.loadingPageChange = true;
      this.currentPage = Number(selectedCurrentPage);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage, per_page: this.reposPerPage},
        queryParamsHandling: 'merge',
      });
    });

    this.error404Subscription = this.apiService
    .getError404Status()
    .subscribe((error404) => {
      this.error404 = error404;
      console.log(this.error404)
    });
  }

  ngOnDestroy(): void {
    if (this.githubSubscription) {
      this.githubSubscription.unsubscribe();
    }
    if (this.paginationPerPageSubscription) {
      this.paginationPerPageSubscription.unsubscribe();
    }
    if (this.paginationCurrentPageSubscription) {
      this.paginationCurrentPageSubscription.unsubscribe();
    }
    if (this.reposCountSubscription) {
      this.reposCountSubscription.unsubscribe();
    }
    if (this.error404Subscription) {
      this.error404Subscription.unsubscribe();
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['username'] &&
    changes['username'].previousValue) ||
    (changes['reposPerPage'] &&
    changes['reposPerPage'].previousValue)) {
      this.fetchRepos();
    }
  }
  
  fetchRepos(): void {
    if (!this.currentPage || 
      !this.reposPerPage || 
      this.currentPage <= 0 ||
      this.reposPerPage <= 0 ||
      isNaN(this.currentPage) ||
      isNaN(this.reposPerPage)) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: 1, per_page: 10 }
      });
    }

    if (this.username !== '' &&
    this.currentPage !== 0 &&
    this.reposPerPage !== 0 &&
    this.apiService.getRepos(this.username, this.currentPage, this.reposPerPage)) {
      this.loading = true;
      this.githubSubscription = this.apiService.getRepos(this.username, this.currentPage, this.reposPerPage)
        .subscribe(
          (data) => {
            this.reposData = data;
            this.fetchReposCount();
            this.loading = false;
            this.loadingPageChange = false;
          },
          (error) => {
            console.error('Error fetching repositories:', error);
            this.loading = false;
            this.loadingPageChange = false;
          }
        );
    }
  }

  fetchReposCount(): void {
    this.reposCountSubscription = this.apiService.getReposCount().subscribe((reposCount) => {
      this.reposCount = reposCount;
    });
  }
}
