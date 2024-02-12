import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  user: any = null;
  loader = true;

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    this.apiService.getUser('johnpapa').subscribe((user: any) => {
      this.user = user;
      this.loader = false;
    });
  }
}
