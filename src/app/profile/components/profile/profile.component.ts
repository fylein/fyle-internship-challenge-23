import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class Profile {
  username: string = "";
  loading: boolean = true;
  githubSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }
}
