import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invalid-user-profile',
  templateUrl: './invalid-user-profile.component.html',
})
export class InvalidUserProfileComponent {
  // Input properties
  @Input() appTheme: string = 'light';
}
