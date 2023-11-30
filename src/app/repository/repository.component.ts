import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent {
  @Input() reponame: string = '';
  @Input() repobio: string = '';
  @Input() language: string = '';
  @Input() username: string = '';
  @Input() key: number = 0;

  truncateText(text: string, limit: number): string {
    if (!text) return '';
    return text.length <= limit ? text : text.substring(0, limit) + '...';
  }
}
