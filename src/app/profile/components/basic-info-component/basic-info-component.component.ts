import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter  } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ApiService, GitHubUser } from 'src/app/services/api.service';

@Component({
  selector: 'basic-info-component',
  templateUrl: './basic-info-component.component.html',
  styleUrls: ['./basic-info-component.component.scss']
})
export class BasicInfoComponent implements OnInit, OnDestroy, OnChanges {
  @Input() username: string = '';
  @Input() loading: boolean = true;

  userData: GitHubUser = {
    name: '',
    bio: '',
    location: '',
    twitter_username: '',
    html_url: '',
    avatar_url: '',
    public_repos: 0
  };  
  userSubscription!: Subscription;
  userDataSubscription!: Subscription;
  initialized: boolean = true;
  error404: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      if (this.initialized) {
        this.subscribeToUserData();
      }
    });
    this.initialized = false;
  }

  private subscribeToUserData(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
    this.loading = true;
    this.userSubscription = this.apiService.getUser(this.username)
      .subscribe((data) => {
        this.apiService.setError404Status(false);
        this.error404 = false;
        this.apiService.setUserData(data);
        this.loading = false;
      },
      (error) => {
        console.log(error)
        this.loading = false;
        this.apiService.setError404Status(true);
        this.error404 = true;
      }
    );

    this.userDataSubscription = this.apiService.getUserData().subscribe((userData) => {
      this.userData = userData;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['username'] && changes['username'].previousValue) {
      this.subscribeToUserData();
    }
  }
}
