import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-repositories',
  templateUrl: './user-repositories.component.html',
  styleUrls: ['./user-repositories.component.scss'],
})
export class UserRepositoriesComponent implements OnInit {
  @Input() reposPerPage: number = 0;
  @Input() reposCurrentPage: number = 0;
  @Input() githubUsername: string = '';

  userRepositoryData: any;
  dataLoaded: boolean = false;

  subscription!: Subscription;

  constructor(private router: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscription = this.apiService
      .getRepos(this.githubUsername, this.reposCurrentPage, this.reposPerPage)
      .subscribe((data) => {
        this.userRepositoryData = data;
        this.dataLoaded = true;
        console.log(data);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe;
    }
    this.dataLoaded = false;
  }
}
