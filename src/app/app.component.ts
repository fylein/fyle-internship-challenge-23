import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn: boolean = false; // Initialize here
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  githubURL: string = '';
  invalidURL: boolean = false;
  //loggedIn: boolean;

  submitURL(): void {
    // Logic to handle URL submission
    if(this.isValidURL(this.githubURL)){
        console.log('submitted Github URL: ', this.githubURL)
    }else{
      console.log('Invalid Github URL:', this.githubURL)
    }
  }

  isValidURL(url:string):boolean{
    const githubUrlPattern = /^(https?:\/\/)?(www\.)?github\.com\/[^\s/]+\/[^\s/]+$/i;
    return githubUrlPattern.test(url);
  }
}
