import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
getOption() {
throw new Error('Method not implemented.');
}
  totalItems: number = 1;
  currentPage: number = 1;
  userData: any;
  userRepos: any[] = [];
  user_name: string = '';
  perPage: number = 10;
  totalPages: number = 1;
  selectedPage: number = 1;
  filterDate: Date | null = null;

  constructor(private apiService: ApiService) {
    this.currentPage = 1;
  }

  ngOnInit() {
    this.fetchUserData(this.user_name);
  }

  fetchUserData(name: string) {
    this.apiService.getUser(this.user_name).subscribe((data: any) => {
      this.userData = data;
      this.totalItems = data.public_repos;
      this.fetchUserRepos(data.repos_url, this.currentPage, this.perPage);
    });
  }

  fetchUserRepos(reposUrl: string, page: number, itemsPerPage: number) {
    const startIndex = (page - 1) * itemsPerPage;
    
    const apiUrl = `${reposUrl}?page=${page}&per_page=${itemsPerPage}`;
    this.apiService.getRepos(apiUrl).subscribe((repos: any[]) => {
    
      this.userRepos = repos;
     

    });
  }

  changePage(action: string | number) {
    if (action === 'prev') {
      if (this.selectedPage > 1) {
        this.selectedPage--;
        this.currentPage--;
        this.fetchUserData(this.user_name);
      } else {
        // Alert when on the first page
        alert('You are on the first page.');
      }
    } else if (action === 'next') {
      if (this.selectedPage < this.totalPages) {
        this.selectedPage++;
        this.currentPage++;
        this.fetchUserData(this.user_name);
      } else {
        // Alert when on the last page
        alert('You are on the last page.');
      }
    } else if (typeof action === 'number' && action >= 1 && action <= this.totalPages) {
      if (action !== this.selectedPage) {
        this.selectedPage = action;
        this.currentPage = action;
        this.fetchUserData(this.user_name);
      }
    }
  }
  

  getPages(totalItems: number, perPage: number): number[] {
    this.totalPages = Math.ceil(totalItems / perPage);
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateUserName() {
    this.currentPage = 1;
    this.selectedPage = 1;
    this.fetchUserData(this.user_name);
  }

  changeNameAndFetchData(newName: string) {
    this.user_name = newName;
    this.updateUserName();
  }


  setOlderFilter() {
    if (this.filterDate) {
      this.filterDate = new Date(this.filterDate.getTime() - 24 * 60 * 60 * 1000); // Decrease by a day
      this.fetchUserRepos(this.userData.repos_url, this.currentPage, this.perPage);
    }
  }
  
  setNewerFilter() {
    if (this.filterDate) {
      this.filterDate = new Date(this.filterDate.getTime() + 24 * 60 * 60 * 1000); // Increase by a day
      this.fetchUserRepos(this.userData.repos_url, this.currentPage, this.perPage);
    }
  }

  
  hetOption() {
    // Update the data based on the selected value of 'perPage'
    this.currentPage = 1; // Reset to the first page
    this.selectedPage = 1;
    this.fetchUserData(this.user_name);
  }
  

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.updateUserName();
    }
  }
}
