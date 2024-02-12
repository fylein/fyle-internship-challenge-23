import { ApiService } from './../../services/api.service';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalRepos: number = 0;
  @Input() reposPerPage: number = 5;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  totalPages: number = 1;
  pages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  ngOnInit() {
    this.onRefresh();
  }
  ngOnChanges(ch: SimpleChange) {
    console.log(ch);

    this.onRefresh();
  }
  onRefresh() {
    this.totalPages = Math.ceil(this.totalRepos / this.reposPerPage);

    if (this.totalPages) {
      this.pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      console.log(this.currentPage, this.totalPages);
      this.pageChanged.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      console.log(this.currentPage, this.totalPages);
      this.pageChanged.emit(this.currentPage);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    console.log(this.currentPage, this.totalPages);

    this.pageChanged.emit(this.currentPage);
  }

  log() {
    console.log(this);
  }
}
