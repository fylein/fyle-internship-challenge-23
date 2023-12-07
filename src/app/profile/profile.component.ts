import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy, OnChanges {
  username: string = "";
  loading: boolean = true;
  githubSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  ngOnDestroy(): void {
    if (this.githubSubscription) {
      this.githubSubscription.unsubscribe();
    }
    this.loading = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['username'] && changes['username'].previousValue) {
      this.fetchUserData();
    }
  }

  navSearch(username: string) {
    this.username = username;
    this.fetchUserData();
  }

  fetchUserData() {    
    if (this.username !== '' && this.apiService.getUser(this.username)) {
      this.loading = true;
  
      this.githubSubscription = this.apiService.getUser(this.username)
      .subscribe((data) => {
        this.apiService.setUserData(data);
        this.loading = false;
      },
      (error) => {
        console.log(error)
      })
    }
  };
}
