import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.githubUsername = this.route.snapshot.params['githubUsername'];
    this.fetchUser();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe;
    }
    this.dataLoaded = false;
  }

  setUsername(githubUsername: string) {
    this.githubUsername = githubUsername;
    this.fetchUser();
  }

  fetchUser() {
    this.dataLoaded = false;
    this.subscription = this.apiService.getUser(this.githubUsername).subscribe(
      (data) => {
        this.userPersonalData = data;
        this.totalRepositories = this.userPersonalData.public_repos;
        this.dataLoaded = true;
      },
      (error) => {
        this.toastr.error(
          'Cannot find user or rate limited! Please try again',
          '',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        this.router.navigate(['']);
      }
    );
  }
}
