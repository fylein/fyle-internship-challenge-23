import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reposCurrentPage = this.route.snapshot.queryParams['page'];
    this.reposPerPage = this.route.snapshot.queryParams['per_page'];
    console.log(this.reposCurrentPage, this.reposPerPage);
    this.fetchRepos();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe;
    }
    this.dataLoaded = false;
  }

  fetchRepos() {
    this.subscription = this.apiService
      .getRepos(this.githubUsername, this.reposCurrentPage, this.reposPerPage)
      .subscribe((data) => {
        this.userRepositoryData = data;
        this.dataLoaded = true;
        console.log(data);
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['githubUsername'] && changes['githubUsername'].previousValue) {
      this.reposCurrentPage = 1;
      this.reposPerPage = 10;
      this.fetchRepos();
      this.dataLoaded = false;
    }
  }
}
