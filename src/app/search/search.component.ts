import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(private data: ApiService){}
  selectedValue: number = 10;
  currPage: number = 1;

  arr: any = [];  //for names of repos
  arr2: any = [];  //for languages corresponding to repo names

  clickSearch(value: string){
    this.data.searchVal = value;
    this.data.getUser(this.data.searchVal).subscribe((res: any) => {
      this.data.avatarUrl = res.user.avatar_url;
      this.data.name = res.user.name;
      this.data.pageNumbers = [];  //empty the array 
      this.data.noOfRepos = res.repos.length;
      this.data.totalPages = Math.ceil(this.data.noOfRepos / 10);
      for (let i = 1; i <= this.data.totalPages; i++) {
        this.data.pageNumbers.push(i);
      }
      this.data.isSearched = true;

      this.data.repos = res.repos;
      const { si, ei } = this.data.reposPerPage(this.currPage, this.data.noOfRepos);
      this.data.slicedRepo = this.data.repos.slice(si, ei);

    //getting names of repos
    this.data.repos.forEach((obj: any) => {
      this.arr.push(obj.name);
    });

    //for displaying languages
    this.arr.forEach((name: any) => {
      this.data.getLanguages(this.data.searchVal, name).subscribe(res => {
        this.arr2.push(res);
      });
    });
    });
    this.selectedValue = 10;
  }
}
