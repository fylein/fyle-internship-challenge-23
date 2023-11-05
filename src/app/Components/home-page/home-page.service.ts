// Import the necessary modules and services from Angular and application-specific sources.
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/config/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { HttpClient } from '@angular/common/http';

// This decorator marks the service as injectable, making it available for dependency injection.
@Injectable({
  providedIn: 'root' // The service is registered at the root level.
})
export class HomePageService {

  // Constructor for the 'HomePageService' that injects required services and dependencies.
  constructor(private apiService: ApiService, private configService: ConfigService, private http: HttpClient) { }

  // Method to get user details from the GitHub API based on a provided username.
  getUserdetails(user) {
    return this.http.get('https://api.github.com/users/' + user);
  }

  // Method to get user repositories from the GitHub API based on a provided username.
  getUserRepo(user) {
    return this.http.get(this.configService.userUrl + '/' + user + '/repos');
  }
}
