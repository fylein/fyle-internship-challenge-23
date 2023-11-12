import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {
  @Input() topics: string[] = ['javascript', 'angular', 'ML'];

  topicss: string[] = ['javascript', 'angular', 'ML', 'javascript', 'angular', 'ML'];
}
