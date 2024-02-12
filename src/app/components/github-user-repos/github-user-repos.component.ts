import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-github-user-repos',
  templateUrl: './github-user-repos.component.html',
  styleUrls: ['./github-user-repos.component.scss']
})
export class GithubUserReposComponent implements OnInit{


  @Input() repoData:any
  constructor(){

  }

  ngOnInit(): void {
    
  }

}

