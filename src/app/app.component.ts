import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { delay } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  userDetails: any;
  repos: any;
  isLoading: boolean = true;
  searchedUser: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
<<<<<<< Updated upstream
    this.apiService.getUser('johnpapa').subscribe(console.log);
=======
    const cachedUserDetails = localStorage.getItem('userDetails');
    const cachedRepos = localStorage.getItem('repos');


    if (cachedUserDetails && cachedRepos) {
      this.userDetails = JSON.parse(cachedUserDetails);
      this.repos = JSON.parse(cachedRepos);
      this.repos.paginator = this.paginator;
      this.isLoading = false;


      this.initPaginator();
    } 
    else {
      this.getUserDetails('Hrishikesh-Bhorde');
    }
  }


  search() {
    this.isLoading = true;
    console.log('Search query:', this.searchedUser);
    this.getUserDetails(this.searchedUser);
    this.isLoading = false;
  
  }

  getUserDetails(username: string) {
    this.apiService.getUser(username).subscribe(
      (res) => {
        this.isLoading = true;
        this.userDetails = res;
        localStorage.setItem('userDetails', JSON.stringify(res));
        this.getUserRepos(this.userDetails?.repos_url);
      },
      (error) => this.handleError('Error fetching user details:', error)
    );
  }

  getUserRepos(reposUrl: string | undefined) {
    if (!reposUrl) {
      this.isLoading = false;
      return;
    }

    this.apiService.getUserRepos(reposUrl).pipe(
      delay(2000)
    ).subscribe(
      (data) => {
        this.repos = data;
        localStorage.setItem('repos', JSON.stringify(data));
        this.isLoading = false;

        // Initialize paginator after fetching data
        setTimeout(() => {
          this.initPaginator();
        });
      },
      (error) => this.handleError('Error fetching user repositories:', error)
    );
  }

  initPaginator() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 10;
    this.paginator.length = this.repos.length;

    this.repos.paginator = this.paginator;
  }

  handleError(errorMessage: string, error: any) {
    console.error(errorMessage, error);
    this.isLoading = false;
>>>>>>> Stashed changes
  }
}




