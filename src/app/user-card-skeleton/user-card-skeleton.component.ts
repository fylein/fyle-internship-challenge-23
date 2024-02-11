import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card-skeleton',
  templateUrl: './user-card-skeleton.component.html',
  styleUrls: ['./user-card-skeleton.component.scss']
})
export class UserCardSkeletonComponent {
  @Input() user!: any;

}
