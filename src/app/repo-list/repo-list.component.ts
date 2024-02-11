import { Component, Input, OnChanges } from '@angular/core';
import { GithubService } from '../services/github.service';
import { User } from '../Model/user';
import { Repo } from '../Model/repo';
import { ActivatedRoute } from '@angular/router';
import { UserCardComponent } from '../user-card/user-card.component';
@Component({
  selector: 'app-repo-list',
  // imports: [UserCardComponent],
  // standalone: true,
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnChanges {
  @Input() userName: string = '';
  user!: User;
  repos: Repo[] = [];
  currPage: number = 1;
  pageSize: number = 10;
  totalRepos: number = 0;
  error: any;
  totalPages: number = 1;
  totalPagesArray: number[] = [];
  @Input() isLoading: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 6000);
  }

  constructor(private githubService: GithubService) {}

  ngOnChanges(): void {
    this.loadRepos();
  }
  loadRepos(){
    this.getUserProfile(this.userName);
    if(this.userName){
      this.repos = []
      // this.githubService.getUserRepos(this.userName, this.currPage, this.pageSize).subscribe((response) => {
      //   this.repos = response.body || [];
      //   const linkHeader = response.headers.get('Link');
      //   this.totalRepos = this.extractTotalRepos(linkHeader);
      // })
      this.githubService
        .getUserRepos(this.userName, this.currPage, this.pageSize)
        .subscribe({
          next: (repos) => {
            this.repos = repos;
          },
          error: (error) => {
            this.error = 'Error fetching user profile';
            console.log(error); // Log the error for debugging
          }
        });

    }
  }

  getUserProfile(userName: string){
    if(userName){
      this.githubService.getUser(userName).subscribe({
        next: (user) => {
          this.error = '';
          this.user = user;
          this.totalRepos = user.public_repos;
          const totalRepos1 = user.public_repos; 
          this.totalPages = Math.ceil(totalRepos1 / this.pageSize);
          this.totalPagesArray = Array.from(
            { length: this.totalPages },
            (_, i) => i + 1
          );
        },
        error: (error) => {
          this.error = 'Error fetching user profile', error;
          console.log(this.error); // Log the error for debugging
        }
      })
    }
  }


  onPageChange(page:number){
    this.currPage = page;
    this.loadRepos();
  }

  onPageSizeChange(number1: number){
    const selectedPageSize = number1;
    if(!isNaN(Number(selectedPageSize))){
      this.pageSize = Number(selectedPageSize);
      this.currPage = 1;
      this.loadRepos();
    }
  }
}
