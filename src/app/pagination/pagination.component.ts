import { Component,Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy{
  totalPages: number = 0;
  currentPage: number = 1;

  private paginationSubscription!: Subscription;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.paginationSubscription = this.apiService.getTotalPages().subscribe(term => {
      if (term) this.totalPages = term;
    }); 

    this.paginationSubscription = this.apiService.getCurrPage().subscribe(term => {
      if (term) this.currentPage = term;
    });
  }

  ngOnDestroy() {
    if (this.paginationSubscription) {
      this.paginationSubscription.unsubscribe();
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.apiService.setCurrPage(this.currentPage);
    this.apiService.getRepos();
  }
}
