import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination-services.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit{
  selectedPerPage: number = 10;
  reposCount: number = 0;
  startPageNumber: number = 0;
  endPageNumber: number = 0;
  currentPageNumber: number = 0;

  constructor(
    private paginationService: PaginationService,
    private apiService: ApiService,) {}

  ngOnInit(): void {
    this.reposCount = this.apiService.getReposCount();
    this.startPageNumber = 1;
    this.endPageNumber = this.reposCount % this.selectedPerPage === 0 ? Math.floor(this.reposCount / this.selectedPerPage) : Math.floor(this.reposCount / this.selectedPerPage) + 1;
    this.currentPageNumber = 1; 
  }

  onSelectedPerPageChange(): void {
    this.paginationService.setSelectedPerPage(this.selectedPerPage);
    this.startPageNumber = 1;
    this.endPageNumber = this.reposCount % this.selectedPerPage === 0 ? Math.floor(this.reposCount / this.selectedPerPage) : Math.floor(this.reposCount / this.selectedPerPage) + 1;
    this.currentPageNumber = 1; 
  }

  onSelectPage(pageNumber: number): void {
    this.paginationService.setSelectedCurrentPage(pageNumber);
    this.currentPageNumber = pageNumber;
  }
}
