import { Component, Input } from '@angular/core';
import { GitHubUser } from 'src/app/models/GitHubUser';

@Component({
  selector: 'app-user-github-profile',
  templateUrl: './user-github-profile.component.html',
})
export class UserGithubProfileComponent {
  // Input properties
  @Input() searchedUser: GitHubUser | undefined;
  @Input() appTheme: string  = 'light';
}
