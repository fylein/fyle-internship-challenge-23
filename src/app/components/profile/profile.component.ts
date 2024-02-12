import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() user: any;

  ngOnInit(): void {
    // Check if user input is provided

    console.log('User data received:', this.user);
  }
}
