import { Component, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss'],
})

export class UserdetailComponent {
  @Input() user!: User;
}
