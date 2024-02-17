import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Developer } from './models/Developer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  // Application title
  appTitle: string = 'REPOFETCH';

  // Current year for the footer
  currentYear: number = new Date().getFullYear();

  // Developer information
  developer: Developer = {
    name: '@sarveshpyadav',
    githubUrl: 'https://github.com/sarveshpyadav',
  };

   /**
   * @brief Initializes the component and emits the initial theme to parent components.
   * @params None
   * @returns None
   */
  ngOnInit():void {
  }
}
