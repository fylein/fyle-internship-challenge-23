import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { USER_INFO,REPO } from './services/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title:string='fyle-frontend-challenge';
  userName: string = '';
  user$:USER_INFO={
    login:'',
    bio:'',
    location:'',
    twitter_user:''
  };
  repo$!:REPO[];
  isLoaded:boolean=true;
  showSkeleton!:boolean;
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.showSkeleton=true
}
  
  handleChange(name: string) {
    this.isLoaded=false;
    this.userName = name;
    console.log(this.userName);
    this.apiService
      .getUser(this.userName)
      .subscribe((user:any) => {
        console.log(user)
      this.isLoaded=true;
      this.showSkeleton=false;
          this.user$={
            login:user.login,
            bio:user.bio,
            location:user.location,
            twitter_user:user.twitter_user
          }
        });
        this.apiService.getRepo(this.userName)
        .subscribe(
          (repos:any)=>{
            repos.map((repo:any)=>{
              this.repo$.push({name:repo.name,language:repo.language,description:repo.description})
            })
          }
        )
  }
  
  
}
