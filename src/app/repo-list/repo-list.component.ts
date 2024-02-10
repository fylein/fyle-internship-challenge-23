import { Component, Input, OnChanges } from '@angular/core';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnChanges {
  @Input() userName: string = '';
  repos: any[] = [];
  currPage: number = 1;
  pageSize: number = 10;
  totalRepos: number = 0;

  constructor(private githubService: GithubService) {}

  ngOnChanges(): void {
    this.loadRepos();
    console.log(this.userName);
  }
  loadRepos(){
    if(this.userName){
      this.repos = []
      this.githubService.getUserRepos(this.userName, this.currPage, this.pageSize).subscribe((response) => {
        this.repos = response.body || [];
        const linkHeader = response.headers.get('Link');
        this.totalRepos = this.extractTotalRepos(linkHeader);
      })
    }
  }

  extractTotalRepos(linkHeader: string | null):number{
    if(!linkHeader) return 0;
    const matches = linkHeader.match(/&page=(\d+)&per_page=(\d+)>; rel="last"/); 
    if (matches && matches.length==3){
      return parseInt(matches[1]) * parseInt(matches[2]);
    }
    return 0;
  }

  onPageChange(page:number){
    this.currPage = page;
    // this.pageSize = newPageSize; // hardcoded for now  
    console.log(this.currPage);
    this.loadRepos();
  }

  onPageSizeChange(number1: number){
    // const selectedPageSize = (number1.target as HTMLSelectElement).value;
    const selectedPageSize = number1;
    console.log(selectedPageSize);
    if(!isNaN(Number(selectedPageSize))){
      this.pageSize = Number(selectedPageSize);
      this.currPage = 1;
      this.loadRepos();
    }
  }
}
