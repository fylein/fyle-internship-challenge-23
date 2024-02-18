import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  constructor(public apiService : ApiService
  ) {}

  
}
