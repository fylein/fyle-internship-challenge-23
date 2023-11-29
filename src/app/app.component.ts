import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  username: string = '';
  constructor(
    private apiService: ApiService
  ) {}


  userSearchHandler(username: string) {
    this.username = username;
  }
}
