import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.scss']
})
export class ProfileComponentComponent {
  @Input() name = '';
  @Input() bio = '';
  @Input() location = '';
  @Input() twitterProfile = '';
  @Input() githubLink = '';
  @Input() avatarUrl = ''
  @Input() fetched = true
}
