import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})

export class MainBodyComponent implements OnInit{

  constructor(public data: ApiService){}

  //When page reloads
  ngOnInit(){
    this.data.getUser('meghasharma0').subscribe(res => {
      this.data.avatarUrl = res.user.avatar_url;
      this.data.name = res.user.name;
      this.data.pageNumbers = [];  //empty the array
      this.data.noOfRepos = res.repos.length;
      this.data.totalPages = Math.ceil(this.data.noOfRepos / 10);
      for (let i = 1; i <= this.data.totalPages; i++) {
        this.data.pageNumbers.push(i);
      }
      // getting repos
      this.data.repos = res.repos;
      const { si, ei } = this.data.reposPerPage(this.data.currPage, this.data.noOfRepos);
      this.data.slicedRepo = this.data.repos.slice(si, ei);
      //getting names of repos
      this.data.repos.forEach((obj: any) => {
        this.data.arr.push(obj.name);
      });
      //for displaying languages
      this.data.arr.forEach((name: any) => {
        this.data.getLanguages(this.data.searchVal, name).subscribe(res => {
          this.data.arr2.push(res);
        });
      });
      this.data.loader = false;
    });
  }

  // when user selects a no of repositories to show per page.
  onSelectChange(event: Event){
    const target = event.target as HTMLSelectElement;
    const sv = target.value;
    this.data.selectedValue = +sv;
    this.data.getUser(this.data.searchVal).subscribe(res => {
      this.data.repos = res.repos;
      this.data.noOfRepos = this.data.repos.length;
      const si: number = (this.data.currPage - 1) * 10;
      let ei: number;
      if (this.data.selectedValue < this.data.noOfRepos){
        ei = Math.min(si + 10, this.data.selectedValue);
        this.data.slicedRepo = this.data.repos.slice(si, ei);
      }else{
        this.data.slicedRepo = this.data.repos;
      }
      this.data.loader = false;
    });
  }
  

  // to display pages below
  // getStartRepoIndex(val: any){
  //   return (val - 1) * 10;
  // }
  // getEndRepoIndex(val: any, val2: any){
  //   return Math.min((val - 1) * 10 + 10, val2)
  // }
  
  // description function
  // descFunc(val: string){
  //   return val === null ? "Not available" : val;
  // }

  // language function
  // langFunc(val: any){
  //   return Object.keys(val).length === 0 ? val = "no content!" : val;
  // }

  //object keys method
  objectKeys(obj: any){
    return Object.keys(obj);
  }
}
