import { Component, OnInit } from '@angular/core';
import {  RepositoryUserService } from '../repository-user.service';
import { User } from '../user';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  user!: User;
  repositories: any;
  constructor(private  RepositoryUserService:  RepositoryUserService) { }

  ngOnInit(): void {
    this.getUserDetails('charan-666');
    this.getUserRepositories('charan-666');
  }

  //user details
  getUserDetails(githubUsername: string) {
    this. RepositoryUserService.getUserResponse(githubUsername).then(
      (response) => {
        this.user = this. RepositoryUserService.getUserDetails;
      },
      (error) => {
        console.log(error);
      }
    ); 
  }


  //user repositories
  getUserRepositories(githubUsername: string) {
    this. RepositoryUserService.getRepositoryResponse(githubUsername).then(
      (response) => {
        this.repositories = this. RepositoryUserService.getRepositoryDetails;
        console.log(this.repositories);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}