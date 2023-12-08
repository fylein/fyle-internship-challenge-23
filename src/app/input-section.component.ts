// input-section.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-input-section',
  templateUrl: './input-section.component.html',
  styleUrls: ['./input-section.component.scss']
})
export class InputSectionComponent {
  username: string = '';

  constructor(private router: Router, private githubService: GithubService) {}

  getRepositories() {
    if (this.username) {
      this.githubService.getRepositories(this.username).subscribe({
        next: (repositories) => {
          console.log('API Response:', repositories);
          this.router.navigate(['/display'], { state: { repositories } });
        },
        error: (error) => {
          console.error('Error fetching repositories:', error);
        }
      });
    } else {
      console.error('Please enter a valid GitHub username.');
    }
  }
}
