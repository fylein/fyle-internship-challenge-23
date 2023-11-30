import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.scss'],
})
export class GithubProfileComponent implements OnInit {
  data: any;
  Repodata: any;
  username: string = '';
  isLoading: boolean = true;
  pageSize = 10; // Set your desired page size
  totalItems = 100; // Set the total number of items
  currentPage = 1;
  constructor(private UserData: ApiService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.username = params['name'];
    });
    try {
      this.data = await lastValueFrom(this.UserData.getUser(this.username));
      console.log(this.data);
      await this.loadRepos();
      this.isLoading = false;
      // Handle the data as needed in this component
    } catch (error) {
      console.error('Error:', error);
      // Handle the error, e.g., display an error message to the user.
    }
  }
  async loadRepos(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.username = params['name'];
    });
    try {
      this.Repodata = await lastValueFrom(
        this.UserData.getRepos(this.username, this.currentPage, this.pageSize)
      );
      console.log(this.Repodata);
      // Handle the data as needed in this component
    } catch (error) {
      console.error('Error:', error);
      // Handle the error, e.g., display an error message to the user.
    }
  }
  //pagination logic
  onPageChanged(page: number): void {
    console.log('Page changed to:', page);
    this.currentPage = page;

    this.loadRepos();
  }
}
