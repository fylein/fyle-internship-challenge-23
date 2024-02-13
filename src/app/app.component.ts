import { Component, OnInit } from '@angular/core';
import { GithubService } from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  searchedUserName!:string;
  constructor(
    private  githubService: GithubService
  ) {}

  ngOnInit() {
    // this.githubService.getUser('johnpapa').subscribe(console.log);
  }
  getUser(userName: string) {
    this.searchedUserName = userName;
    // console.log(this.searchedUserName);

  }
}
