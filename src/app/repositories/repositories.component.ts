import { Component , OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit, OnDestroy {
  repositories: any[] = [];
  isLoading: boolean = false;
  private searchSubscription!: Subscription;
  constructor(private apiService: ApiService) {}

  ngOnInit() {  
    
    this.searchSubscription = this.apiService.getSearchTerm().subscribe(term => {
      this.isLoading = true;
      if (term) this.getRepos();
    });

    this.searchSubscription = this.apiService.getCurrPage().subscribe(term => {
      this.isLoading = true;
      if (term) this.getRepos();
    });

    this.isLoading = false;
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  getRepos() {
    this.isLoading = true;
    this.apiService.getRepos().subscribe({
      next: (repos) => {
        
        this.repositories = repos;
      },
      error: (err) => {
        console.error('Error fetching repositories:', err);
      }
    });
    this.isLoading = false;
  }
}
