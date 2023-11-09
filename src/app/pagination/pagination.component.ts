import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(action: string | number): void {
    if (action === 'prev' && this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    } else if (action === 'next' && this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    } else if (typeof action === 'number' && action >= 1 && action <= this.totalPages) {
      this.pageChange.emit(action);
    }
  }

  calculateTotalPages(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
