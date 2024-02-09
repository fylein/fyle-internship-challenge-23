import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  selector: 'gg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getUser('johnpapa').subscribe(console.log);
  }
}
export class AppComponent {
  title = 'gg';
}
