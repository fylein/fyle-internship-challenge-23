import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() sizeChange: EventEmitter<number> = new EventEmitter<number>();
  // Arr:Array<any> = [1,2,3,4,5,6,7,8,9,10];


  onPageChange(page : number){
    this.pageChange.emit(page);
  }
  onPageSizechange(pageSize12: any){
    this.sizeChange.emit(pageSize12);
  }

  calculateTotalPages(){
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onPageSizeChange(event: Event){
    // debugger;
    const selectedPageSize = (event.target as HTMLSelectElement).value;
    console.log(selectedPageSize);
    if (!isNaN(Number(selectedPageSize))) {
      this.pageSize = Math.min(100, Number(selectedPageSize));
      // this.pageSize = Number(selectedPageSize);
      this.currentPage = 1; // Reset to the first page when changing page size
      this.onPageSizechange(this.pageSize); // Emitting page change event to update repos
      
    }

  }
  getPageNumbers(): number[] {
    const totalPages = this.calculateTotalPages();
    //  this.Arr = Array.from({length: totalPages}, (_, index) => index + 1);
    return Array.from({length: totalPages}, (_, index) => index + 1);
  }
  

}
