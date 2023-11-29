import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() pageSize: number;
  @Input() totalItems: number;
  @Input() currentPage: number;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  constructor() {
    this.pageSize = 10; // Example default value, adjust as needed
    this.totalItems = 100;
    this.currentPage = 1;
  }
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }

  getPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
