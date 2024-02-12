import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent {
@Input() repo:any;

capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

trimDescription(str: string | null | undefined): string {
  if (!str) {
    return '';
  }
  return str.slice(0, 120) + ".";
}

}