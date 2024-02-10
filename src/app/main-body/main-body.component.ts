import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})

export class MainBodyComponent implements OnInit{
  userData: any;
  repos: any;
  slicedRepo: any;

  searchVal: string = "meghasharma0";
  loader: boolean = true;
  selectedValue: number = 10;

  userObj: any = {
    avatar_url: "",
    name: "",
    noOfRepos: 0
  }

  arr: any = [];  //for names of repos
  arr2: any = [];  //for languages corresponding to repo names

  constructor(private data: ApiService){}

  // When user clicks on the search button
  clickSearch(value: string){
    this.searchVal = value;
    
    //displaying user data on search
    this.data.getUser(this.searchVal).subscribe(res => {
      this.userData = res;
      this.userObj.avatar_url = this.userData.avatar_url;
      this.userObj.name = this.userData.name;
      this.loader = false;
    });

    //paging on search
    this.data.getRepos(this.searchVal).subscribe(res => {
      this.repos = res;
      this.userObj.noOfRepos = this.repos.length;
      const si: number = (this.currPage - 1) * 10;
      const ei: number = Math.min(si + 10, this.userObj.noOfRepos);
      this.slicedRepo = this.repos.slice(si, ei);
      //getting names of repos
      this.repos.forEach((obj: any) => {
        this.arr.push(obj.name);
      })
      //for displaying languages
      this.arr.forEach((name: any) => {
        this.data.getLanguages(this.searchVal, name).subscribe(res => {
          this.arr2.push(res);
        });
      });
      this.loader = false;
    });

    //changing selected value to default
    this.selectedValue = 10;
  }

  //When page reloads
  ngOnInit(){
    // Displaying user data (default)
    this.data.getUser(this.searchVal).subscribe(res => {
      this.userData = res;
      this.userObj.avatar_url = this.userData.avatar_url;
      this.userObj.name = this.userData.name;
      this.loader = false;
    });

    //paging (default)
    this.data.getRepos(this.searchVal).subscribe(res => {
      this.repos = res;
      this.userObj.noOfRepos = this.repos.length;
      const si: number = (this.currPage - 1) * 10;
      const ei: number = Math.min(si + 10, this.userObj.noOfRepos);
      this.slicedRepo = this.repos.slice(si, ei);
      //getting names of repos
      this.repos.forEach((obj: any) => {
        this.arr.push(obj.name);
      })
      //for displaying languages
      this.arr.forEach((name: any) => {
        this.data.getLanguages(this.searchVal, name).subscribe(res => {
          this.arr2.push(res);
        });
      });
      this.loader = false;
    });

    //changing selected value to default
    this.selectedValue = 10;
  }

  // when user selects a no of repositories to show per page.
  onSelectChange(event: Event){
    const target = event.target as HTMLSelectElement;
    const sv = target.value;
    this.selectedValue = +sv;
    this.data.getRepos(this.searchVal).subscribe(res => {
      this.repos = res;
      this.userObj.noOfRepos = this.repos.length;
      const si: number = (this.currPage - 1) * 10;
      let ei: number;
      if (this.selectedValue < this.userObj.noOfRepos){
        ei = Math.min(si + 10, this.selectedValue);
        this.slicedRepo = this.repos.slice(si, ei);
      }else{
        this.slicedRepo = this.repos;
      }
      this.loader = false;
    });
  }
  

  currPage: number = 1;
  // prev page functionality
  prev(){
    // console.clear();
    this.data.getRepos(this.searchVal).subscribe(res => {
      this.repos = res;
      this.currPage > 1 ? this.currPage-- : this.currPage = 1;
      const si: number = (this.currPage - 1) * 10;
      const ei: number = Math.min(si + 10, this.userObj.noOfRepos);
      this.slicedRepo = this.repos.slice(si, ei);
    });
    //changing selected value to default
    this.selectedValue = 10;
  }

  // next page functionality
  next() {
    // console.clear();
    // Check if there are more items available for the next page
    if ((this.currPage * 10) < this.userObj.noOfRepos) {
      this.data.getRepos(this.searchVal).subscribe(res => {
        this.repos = res;
        this.currPage++;
        this.userObj.noOfRepos = this.repos.length;
        const si: number = (this.currPage - 1) * 10;
        const ei: number = Math.min(si + 10, this.userObj.noOfRepos);
        this.slicedRepo = this.repos.slice(si, ei);
      });
    }
    //changing selected value to default
    this.selectedValue = 10;
  }

  // to display pages below
  getStartRepoIndex(val: any){
    return (val - 1) * 10;
  }
  getEndRepoIndex(val: any, val2: any){
    return Math.min((val - 1) * 10 + 10, val2)
  }

  // populating page size options
  options: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  
  // description function
  descFunc(val: string){
    return val === null ? "Not available" : val;
  }

  // language function
  langFunc(val: any){
    return Object.keys(val).length === 0 ? val = "no content!" : val;
  }

  //object keys method
  objectKeys(obj: any){
    return Object.keys(obj);
  }
}
