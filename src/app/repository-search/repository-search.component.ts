import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RepositoryUserService } from '../repository-user.service';

@Component({
  selector: 'app-repository-search',
  templateUrl: './repository-search.component.html',
  styleUrls: ['./repository-search.component.scss']
})
export class RepositorySearchComponent implements OnInit {

  //access form inputs
  @ViewChild('f') searchRepositoryForm!: NgForm;

  repositories: any;
  searchText!: string;
  displayUserRepositoryList = false;
  displayUserErrorMessage = false;
  repositoryUserService: any;
  constructor(private userservice: RepositoryUserService) { }

  ngOnInit(): void {}

  //search for github repositories
  searchGithubUserRepositories() {
    this.searchText = this.searchRepositoryForm.value.search;
    this.userservice.getRepositoryResponse(this.searchText).then(
      (response) => {
        this.repositories = this.userservice.getRepositoryDetails;
        this.displayUserRepositoryList = true;
      },
      (error) => {
        this.displayUserErrorMessage = true;
        console.log(error);
      }
    );
  }
}