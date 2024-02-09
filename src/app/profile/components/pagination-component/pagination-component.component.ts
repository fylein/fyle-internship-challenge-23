import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PaginationService } from 'src/app/services/pagination-services/pagination-services.service';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pagination-component',
  templateUrl: './pagination-component.component.html',
  styleUrls: ['./pagination-component.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  selectedPerPage: number = 10;
  reposCount: number = 0;
  startPageNumber: number = 0;
  endPageNumber: number = 0;
  currentPageNumber: number = 0;
  reposCountSubscription!: Subscription;
  error404Subscription!: Subscription;
  error404: boolean = false;

  constructor(
    private paginationService: PaginationService,
    private apiService: ApiService,
    private route: ActivatedRoute
    ) {
      this.route.queryParams.subscribe(queryParams => {
        this.onSelectPage(Number(queryParams['page']));
      });
    }

  ngOnInit(): void {
    this.fetchReposCount();
    if (this.apiService.getError404Status()) {
      this.error404Subscription = this.apiService.getError404Status().subscribe((error404) => {
        this.error404 = error404;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.reposCountSubscription) {
      this.reposCountSubscription.unsubscribe();
    }
    if (this.error404Subscription) {
      this.error404Subscription.unsubscribe();
    }
  }

  onSelectedPerPageChange(): void {
    this.paginationService.setSelectedPerPage(this.selectedPerPage);
    this.startPageNumber = 1;
    this.endPageNumber = (this.reposCount % this.selectedPerPage === 0) ?
    Math.floor(this.reposCount / this.selectedPerPage) :
    Math.floor(this.reposCount / this.selectedPerPage) + 1;
    this.currentPageNumber = 1; 
  }

  onSelectPage(pageNumber: number): void {
    this.paginationService.setSelectedCurrentPage(pageNumber);
    this.currentPageNumber = pageNumber;
  }

  fetchReposCount(): void {
    if (this.apiService.getReposCount()) {
      this.reposCountSubscription = this.apiService.getReposCount().subscribe((reposCount) => {
        this.reposCount = reposCount;
        this.startPageNumber = 1;
        this.endPageNumber = (this.reposCount % this.selectedPerPage === 0) ?
        Math.floor(this.reposCount / this.selectedPerPage) :
        Math.floor(this.reposCount / this.selectedPerPage) + 1;
        this.currentPageNumber = 1; 
      });
    }
  }
}