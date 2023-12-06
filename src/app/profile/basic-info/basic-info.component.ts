import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService, GitHubUser } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
    this.subscribeToUserData();
  }

  private subscribeToUserData(): void {
    this.userSubscription = this.apiService.getUser(this.username)
    .subscribe((data) => {
      this.apiService.setUserData(data);
      this.loading = false;

    })
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
