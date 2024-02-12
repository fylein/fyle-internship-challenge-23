import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string = 'Fyle Frontend'; 

  constructor(
    private titleService: Title
  ) {
    this.titleService.setTitle(this.title); 
  }
}
