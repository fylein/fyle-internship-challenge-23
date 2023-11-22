import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  // githubUsername$ = this.router.paramMap.pipe(map((params) => params.get("githubUsername")));
  githubUsername: string = 'jayshil-n-b';
  totalRepositories = 0;

  userPersonalData: any = {};
  dataLoaded: boolean = false;

  subscription!: Subscription;

  constructor(private router: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.githubUsername = this.router.snapshot.params['githubUsername'];
    this.subscription = this.apiService
      .getUser(this.githubUsername)
      .subscribe((data) => {
        this.userPersonalData = data;
        this.totalRepositories = this.userPersonalData.public_repos;
        this.dataLoaded = true;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe;
    }
    this.dataLoaded = false;
  }
}
