import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repo-card-skeleton',
  templateUrl: './repo-card-skeleton.component.html',
  styleUrls: ['./repo-card-skeleton.component.scss']
})
export class RepoCardSkeletonComponent {
  @Input() repos!: any;

}
