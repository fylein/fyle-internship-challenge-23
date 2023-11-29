import { ApiService } from '../services/api.service';
import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-person-repositories',
  templateUrl: './person-repositories.component.html',
  styleUrls: ['./person-repositories.component.css']
})
export class PersonRepositoriesComponent implements OnChanges {
  @Input() totalRepos!: number;
  @Input() username!: string;

  userRepos: any = null;
  fetchingRepos: boolean = false;

  currentPage = 1;
  maxPerPage = 10;

  // Injecting the Github Service
  constructor(private ServiceFileService: ApiService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // To fetch the repos again
  // if totalRepos && username gets updated
  // due to searching of new username
  ngOnChanges(): void {
    if (this.totalRepos > 0) {
      this.currentPage = 1;
      this.fetchRepos();
    }
  }

  // Public Repos that the user owns are fetched
  fetchRepos() {
    this.reset();
    this.fetchingRepos = true;

    this.ServiceFileService
      .getUserRepos(this.username, this.currentPage, this.maxPerPage)
      .subscribe({
        next: (res) => {
          this.userRepos = res;
          this.fetchingRepos = false;
        },
        error: (err) => {
          this.userRepos = null;
          this.fetchingRepos = false;
        },
      });
  }

  // To handle pagination option change
  handlePageChange(p: any) {
    this.currentPage = p;
    this.fetchRepos();
  }

  reset() {
    this.userRepos = null;
  }

  // As the Github Search repositoryQuery returns first 1000 results only
  // Hence setting a limit on total UserRepos to show in Pagination
  maxRepoLimiter(): number {
    if (this.userRepos.total_count! > 1000) {
      return (this.userRepos.total_count = 1000);
    }
    return this.userRepos.total_count;
  }

}
