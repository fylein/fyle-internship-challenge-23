import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-util-pagination',
  templateUrl: './util-pagination.component.html',
})
export class UtilPaginationComponent {
  // Input properties for total items, items per page, current page, and options for items per page
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Input() itemsPerPageOptions: number[] = [10, 15, 25, 50, 100];
  @Input() appTheme: string = "light";

  // Output events for page change and items per page change
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  /**
   * @brief Calculates the total number of pages based on total items and items per page.
   * @returns The total number of pages.
   */
  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  /**
   * @brief Increases the current page and emits the updated page number.
   */
  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  /**
   * @brief Decreases the current page and emits the updated page number.
   */
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }
}
