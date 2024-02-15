import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-repo-list',
  templateUrl: './user-repo-list.component.html',
})
export class UserRepoListComponent {
  // Input properties
  @Input() repos: any[] = [];
  @Input() appTheme: string = '';
}
