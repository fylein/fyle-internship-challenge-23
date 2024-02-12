import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  constructor(public data : ApiService){}
  
  prevClick(){
    this.data.currPage > 1 ? this.data.prev() : alert('First page');
  }
  nextClick(){
    if (this.data.currPage < this.data.totalPages) {
      this.data.next();
    } else {
      alert('Last page!');
    }
  }
}
