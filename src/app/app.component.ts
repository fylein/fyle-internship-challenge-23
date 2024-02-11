import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  username: string = '';
  userData: any; 
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getUser('johnpapa').subscribe(console.log);
  }
  onSubmit() {
    this.getUserData(this.username);
  }
  getUserData(username: string) {
    this.apiService.getUser(username).subscribe(
      (data: any) => {
        this.userData = data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    )
  }
}
