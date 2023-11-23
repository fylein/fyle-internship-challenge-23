import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-repositories',
  templateUrl: './user-repositories.component.html',
  styleUrls: ['./user-repositories.component.scss'],
})
export class UserRepositoriesComponent implements OnInit, OnChanges {
  @Input() githubUsername: string = '';
  @Input() totalRepositories: number = 10;
  reposPerPage: number = 10;
  reposCurrentPage: number = 1;

  userRepositoryData: any;
  dataLoaded: boolean = false;

  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reposCurrentPage = this.route.snapshot.queryParams['page'];
    this.reposPerPage = this.route.snapshot.queryParams['per_page'];

    if (!this.reposCurrentPage || !this.reposPerPage) {
      this.reposCurrentPage = 1;
      this.reposPerPage = 10;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { per_page: 10, page: 1 },
        queryParamsHandling: 'merge',
      });
    }

    if (
      Number.isNaN(Number(this.reposCurrentPage)) ||
      Number.isNaN(Number(this.reposPerPage)) ||
      Number(this.reposPerPage) <= 0 ||
      Number(this.reposCurrentPage) <= 0
    ) {
      this.reposCurrentPage = 1;
      this.reposPerPage = 10;
      this.toastr.error('Invalid query params. Resetting to default!', '', {
        positionClass: 'toast-bottom-right',
      });
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { per_page: 10, page: 1 },
        queryParamsHandling: 'merge',
      });
    }

    this.fetchRepos();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe;
    }
    this.dataLoaded = false;
  }

  fetchRepos() {
    this.dataLoaded = false;
    this.subscription = this.apiService
      .getRepos(this.githubUsername, this.reposCurrentPage, this.reposPerPage)
      .subscribe((data) => {
        this.userRepositoryData = data;
        this.dataLoaded = true;
      });
  }

  setPerPage(newPerPage: number) {
    this.reposPerPage = newPerPage;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { per_page: newPerPage },
      queryParamsHandling: 'merge',
    });
    this.fetchRepos();
    this.dataLoaded = false;
  }

  setPage(newPage: number) {
    this.reposCurrentPage = newPage;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: newPage },
      queryParamsHandling: 'merge',
    });
    this.fetchRepos();
    this.dataLoaded = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['githubUsername'] && changes['githubUsername'].previousValue) {
      this.reposCurrentPage = 1;
      this.reposPerPage = 10;
      this.fetchRepos();
      this.dataLoaded = false;
    }
  }
}
