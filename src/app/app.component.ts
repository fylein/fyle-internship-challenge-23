import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(
    private apiService: ApiService
  ) {
  }
}
