import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-items-per-page',
  templateUrl: './items-per-page.component.html',
  styleUrls: ['./items-per-page.component.scss']
})
export class ItemsPerPageComponent {
  itemsPerPage: number = 10;
  @Output() itemsPerPageChange = new EventEmitter<number>();

  updateItemsPerPage(): void {
    this.itemsPerPageChange.emit(this.itemsPerPage);
  }
}
