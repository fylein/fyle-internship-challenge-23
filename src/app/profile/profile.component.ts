import { Component,Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() user: any;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getUser('torvalds');
  }

  getUser(githubUsername: string) {
    this.apiService.getUser(githubUsername).subscribe((userJson: any) => {
      this.user = userJson;
    });
  }
}
