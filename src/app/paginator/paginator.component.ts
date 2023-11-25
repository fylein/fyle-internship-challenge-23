import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() pages = 0;
  @Output() pageEvent = new EventEmitter<PageEvent>();
  handlePageEvent(event: PageEvent) {
    this.pageEvent.emit(event);    
  }

}
