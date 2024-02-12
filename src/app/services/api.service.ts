import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, forkJoin, map, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  searchVal: string = "meghasharma0";
  avatarUrl: string = "";
  name: string = "";
  noOfRepos: number = 0;
  repos: any;
  slicedRepo: any;
  currPage: number = 1;
  selectedValue: number = 10;
  arr: any = [];  //for names of repos
  arr2: any = [];  //for languages corresponding to repo names
  options: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];  // populating page size options
  loader: boolean = true;
  totalPages: number = 0;
  pageNumbers: number[] = [];

   // logic of displaying no of repositories per page.
  reposPerPage(curr: number, no: number){
    const si = (curr - 1) * 10;
    const ei = Math.min(si + 10, no);
    return {
      si, ei
    }
  }

   // prev page functionality
   prev(){
    this.getUser(this.searchVal).subscribe(res => {
      this.repos = res.repos;
      this.currPage > 1 ? this.currPage-- : this.currPage = 1;
      const { si, ei } = this.reposPerPage(this.currPage, this.noOfRepos);
      this.slicedRepo = this.repos.slice(si, ei);
    });
    this.selectedValue = 10;
    this.loader = false;
  }

  // next page functionality
  next() {
    // Check if there are more items available for the next page
    if ((this.currPage * 10) < this.noOfRepos) {
      this.getUser(this.searchVal).subscribe(res => {
        this.repos = res.repos;
        this.currPage++;
        this.noOfRepos = this.repos.length;
        const { si, ei } = this.reposPerPage(this.currPage, this.noOfRepos);
        this.slicedRepo = this.repos.slice(si, ei);
      });
    }
    this.selectedValue = 10;
    this.loader = false;
  }

  // ****************************************************

  // Getting users
  getUser(githubUsername: string): Observable<any> {
    const userObservable = this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
    const reposObservable = this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`);

    return forkJoin([userObservable, reposObservable]).pipe(
      map(([user, repos]) => {
        return {
          user: user,
          repos: repos
        };
      })
    );
  }

  //Getting languages
  getLanguages(username: string, repoName: string){
    return this.httpClient.get(`https://api.github.com/repos/${username}/${repoName}/languages`);
  }

}
