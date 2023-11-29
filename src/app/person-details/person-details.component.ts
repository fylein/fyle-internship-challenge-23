import { ApiService } from '../services/api.service';
import { Component, OnChanges, Input } from '@angular/core';

import {
  faLocationDot,
  faEnvelope,
  faLink,
} from '@fortawesome/free-solid-svg-icons';

import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnChanges {
  @Input() username!: string;

  locationIcon = faLocationDot;
  emailIcon = faEnvelope;
  blogIcon = faLink;
  twtIcon = faTwitter;
  ghIcon = faGithub;

  mailUrl = 'mailto:';
  twtUrl = 'https://twitter.com/';

  userInfo: any = null;
  fetchingInfo: boolean = false;

  // Injecting the Github Service
  constructor(private ServiceFileService: ApiService) {}

  // Fetching the userInfo
  fetchUserInfo() {
    this.reset();
    this.fetchingInfo = true;

    this.ServiceFileService.getUserDetails(this.username).subscribe({
      next: (res) => {
        this.userInfo = res;
        this.fetchingInfo = false;
      },
      error: (err) => {
        this.userInfo = null;
        this.fetchingInfo = false;
      },
    });
  }

  reset() {
    this.userInfo = null;
  }

  // To refetch the profile if new username is entered in search component
  ngOnChanges(): void {
    this.fetchUserInfo();
  }

}
