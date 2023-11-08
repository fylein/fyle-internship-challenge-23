import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  showSearch=true;
  showUser=false;
  showRepositories=false;
  githubUsername:string=""
  user:any={}
  repos:any[]=[]
  page:number=1;
  per_page:number=10;
  total_repos:number=0;
  isLoading:Boolean=true;
  
  constructor(
    private apiService: ApiService
  ) {}
  
  search() {
    this.apiService.getUser(this.githubUsername).subscribe(data => {
      this.user=data
      console.log(this.user)
      this.showSearch=false
      this.showUser=true
      this.total_repos=this.user.public_repos
    });
    this.getRepositories()
  }
  getRepositories(){
    this.apiService.getRepos(this.githubUsername,this.page,this.per_page).subscribe(data => {
      this.repos=data
      
      console.log(this.repos)
      console.log(this.total_repos)
      this.showRepositories=true;
      
    });

    
  }

  change_per_page(){
    this.getRepositories()

  }

  createRange(){
  
    return new Array(Math.ceil(this.total_repos/this.per_page)).fill(0)
      .map((n, index) => index + 1);
  }

  changePage(page:number){
    this.page=page
    this.getRepositories()
  }

  ngOnInit() {
    //this.apiService.getUser('johnpapa').subscribe(console.log);
    
  }
}
