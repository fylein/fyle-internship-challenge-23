import { Component, Input } from '@angular/core';
import { Repo } from '../repo';

@Component({
  selector: 'app-reposgrid',
  templateUrl: './reposgrid.component.html',
  styleUrls: ['./reposgrid.component.scss']
})
export class ReposgridComponent {
  @Input() repos: Repo[] = [];
}
