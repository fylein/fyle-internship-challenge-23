import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  username = 'Mspidy'
  userDetails:any={}
  userAllRepo:any = []
  p: number = 1;
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getUser()
    this.getUserallRepo()
  }

  getUser(){
    this.apiService.getUser(this.username).subscribe((res:any)=>{
      console.log(res)
      this.userDetails = res
    },(error) => {
      console.error('Error fetching profile data:', error);
    });
  }

  getUserallRepo(){
    this.apiService.getUserRepository(this.username).subscribe((res:any)=>{
      console.log(res)
      this.userAllRepo = res
    })
  }

  repoDetails(val:any){
    console.log(val)
    window.open(val, '_blank');
  }

  
}
