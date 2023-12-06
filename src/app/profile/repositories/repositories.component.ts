import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService, GitHubUser, GitHubRepository } from 'src/app/services/api.service';
import { PaginationService } from 'src/app/services/pagination-services.service';

@Component({
  selector: 'repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit, OnDestroy, OnChanges {
  @Input() username: string = '';
  @Input() loading: boolean = true;
  loadingPageChange: boolean = false;
  reposCount: number = 0;
  reposPerPage: number = 10;
  currentPage: number = 1;
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
  response: any;
  newCurrentPage: number = 0;
  githubSubscription!: Subscription;
  reposCountSubscription!: Subscription;
  paginationPerPageSubscription!: Subscription;
  paginationCurrentPageSubscription!: Subscription;

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
    this.reposCountSubscription = this.apiService.getReposCount().subscribe((reposCount) => {
      this.reposCount = reposCount;
      this.fetchRepos();
    });
    
    this.paginationPerPageSubscription = this.paginationService.getSelectedPerPage().subscribe((selectedPerPage) => {
      this.loadingPageChange = true;
      this.currentPage = 1;
      this.reposPerPage = Number(selectedPerPage);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: 1, per_page: this.reposPerPage },
        queryParamsHandling: 'merge',
      });
      this.fetchRepos();
    });

    this.paginationCurrentPageSubscription = this.paginationService.getSelectedCurrentPage().subscribe(selectedCurrentPage => {
      this.loadingPageChange = true;
      this.currentPage = Number(selectedCurrentPage);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage, per_page: this.reposPerPage},
        queryParamsHandling: 'merge',
      });
      this.fetchRepos();
    })
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
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['username'] && changes['username'].previousValue) || (changes['reposPerPage'] && changes['reposPerPage'].previousValue)) {
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
        queryParams: { page: 1, per_page: 10 },
        queryParamsHandling: 'merge',
      });
    }

    // else if (((this.currentPage * this.reposPerPage) > this.reposCount) && ((((this.currentPage - 1) * this.reposPerPage) + 1) > this.reposCount)) {
    //   this.currentPage = 1;
    //   this.router.navigate([], {
    //     relativeTo: this.route,
    //     queryParams: { page: this.currentPage, per_page: this.reposPerPage },
    //     queryParamsHandling: 'merge',
    //   });
    // }

      // console.log(this.currentPage, this.reposPerPage)
    this.loading = true;
    this.githubSubscription = this.apiService.getRepos(this.username, this.currentPage, this.reposPerPage)
    .subscribe((data) => {
      this.reposData = data;
      this.loading = false;
      this.loadingPageChange = false;
    })
  }
}
