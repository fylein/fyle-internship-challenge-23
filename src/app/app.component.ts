import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  usrname: string = "";
  allRepoList: any;
  userData: any;
  inputBoxSize: number = 30;
  displayName: string = "";
  userUrl: string = "";
  avatarUrl: string = "";
  bio: string = "";
  location: any = null;
  twitter: any = null;

  hideLoader: boolean = true;
  hideData: boolean = true;
  hideError: boolean = true;
  hideNoInput: boolean = true;
  perpage: any = 10;
  currentPage: number = 1;
  lastPage: number = 100;
  totalRepos: number = 0;
  currentRepos: any;
  arr9: number[] = Array(9);
  title: string = "fyle-frontend-challenge";

  constructor(
    private apiService: ApiService,
  ) { }

  usernameEntered(eventData: Event) {
    this.inputBoxSize = this.usrname.length + 10;
    if (this.inputBoxSize <= 10) this.inputBoxSize = 30;
  }

  async getData(gitName: string) {

    this.hideLoader = false;
    this.hideData = true;
    this.hideError = true;
    this.hideNoInput = true;

    this.perpage = this.perpage > 100 ? 100 : this.perpage;
    this.perpage = this.perpage < 10 ? 10 : this.perpage;

    let status = false;

    try {

      if (gitName == "") {
        throw new Error("noInput")
      }

      this.allRepoList = await this.apiService.getRepos(gitName, this.perpage);
      this.currentRepos = this.allRepoList[this.currentPage - 1].data;

      this.lastPage = this.allRepoList.length;
      this.totalRepos = (this.lastPage - 1) * this.perpage + this.allRepoList.slice(-1)[0].data.length;

      this.userData = await this.apiService.getUser(gitName);
      

      this.displayName = this.userData.data.name;
      this.avatarUrl = this.userData.data.avatar_url;
      this.bio = this.userData.data.bio;
      this.location = this.userData.data.location;
      this.userUrl = this.userData.data.html_url;

      if (this.userData.data.twitter_username != null) {
        this.twitter = "https://twitter.com/" + this.userData.data.twitter_username;
      }

      this.hideLoader = true;
      this.hideData = false;

      status = true;

    }

    catch (error) {
      this.hideLoader = true;
      if (error == "Error: noInput") {
        this.hideNoInput = false;
      }
      else {
        this.hideError = false
      }

    }
    return status;

  }

  getFirst() {
    this.currentPage = 1;
    this.currentRepos = this.allRepoList[this.currentPage - 1].data;
  }
  getPrev() {
    this.currentPage--;
    this.currentRepos = this.allRepoList[this.currentPage - 1].data;
  }
  getNext() {
    this.currentPage++;
    this.currentRepos = this.allRepoList[this.currentPage - 1].data;
  }
  getLast() {
    this.currentPage = this.allRepoList.length;
    this.currentRepos = this.allRepoList[this.currentPage - 1].data;
  }

}
