import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FetchUserDataService } from '../../services/fetchData/fetch-user-data.service'
import { SharedServiceService } from '../../services/shared/shared-service.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.scss']
})
export class ReposListComponent {

  userName: string = ''
  userData: any[] = []
  private api: string = ''
  p: number = 1;
  count = 0;
  pageSize = 10;
  name: string = ''
  bio: string = ''
  location: string = ''
  twitterProfile: string = ''
  githubLink: string = ''
  avatarUrl: string = ''
  repoName: string = ''
  repoDescription: string = ''
  keys: string[][] = [];
  fetchedRepo: boolean = true
  fetchedProfile: boolean = true

  constructor(private fetchData: FetchUserDataService, private sharedService: SharedServiceService) {
    // receiving the click event from the button component
    this.sharedService.click$.subscribe((event) => {

      this.userName = event.data;
      this.fetchCount();

      this.submitUsername();
    });
  }

  // Fetching Profile data from API
  fetchCount() {
    this.fetchedProfile = false
    this.fetchData.fetchData(`https://api.github.com/users/${this.userName}`).subscribe(
      {
        next: (response) => {
          console.log('In fetchCount method');
          this.fetchedProfile = true
          this.count = response.public_repos;
          this.location = response.location;
          this.bio = response.bio;
          this.name = response.name;
          this.twitterProfile = response.twitterProfile;
          this.githubLink = response.html_url;
          this.avatarUrl = response.avatar_url;
          this.githubLink = `https://github.com/${this.userName}`
        },
        error: (error) => {
          this.fetchedProfile = true
          alert('Error Displaying conent');
          console.log(error);
        }
      }
    );
  }

  // Fetching Repository data from the API
  submitUsername() {
    this.fetchedRepo = false
    this.api = `https://api.github.com/users/${this.userName}/repos?page=${this.p}&per_page=10`
    console.log(this.count);
    this.fetchData.fetchData(this.api).subscribe({
      next: async (response) => {
        // Fetching languages used of each repository from API
        for (var i = 0; i < response.length; i++) {
          try {
            const result = await lastValueFrom(this.fetchData.fetchData(response[i]['languages_url']))
            var tempStorage = Object.keys(result);
            if (tempStorage.length > 4) {
              var remainingLanguages = tempStorage.length - 4;
              tempStorage[3] = tempStorage[3] + '+' + remainingLanguages
              tempStorage = tempStorage.slice(0, 3);
            }
            this.keys.push(tempStorage);
            console.log(this.keys);
          } catch (error) {
            this.fetchedRepo = true;
            console.log(error);
          }
        }
        this.userData = response;
        this.fetchedRepo = true;
      },
      error: (error) => {
        this.fetchedRepo = true;
        alert("Error Displaying data")
        console.log(error);
      }
    });
    console.log('Username submitted:', this.userName);
  }

  // Handling Next, Prev and Page Number buttons for chaning pages
  handlePageChange(event: number): void {
    this.p = event;
    this.fetchedRepo = false
    this.submitUsername();
  }

}
