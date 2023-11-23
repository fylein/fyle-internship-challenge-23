import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repoitory-card',
  templateUrl: './repoitory-card.component.html',
  styleUrls: ['./repoitory-card.component.scss'],
})
export class RepoitoryCardComponent {
  @Input() repoName: string = '';
  @Input() repoDescription: string = '';
  @Input() repoTopics: any = [];
  @Input() repoLink: string = '';
}
