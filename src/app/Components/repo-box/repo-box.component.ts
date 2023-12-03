import { keyframes } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repo-box',
  templateUrl: './repo-box.component.html',
  styleUrls: ['./repo-box.component.scss']
})
export class RepoBoxComponent {
  @Input() repoName = ''
  @Input() repoDescription = ''
  @Input() keys:any
}
