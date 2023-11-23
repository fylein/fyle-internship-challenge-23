import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-repositories-pagination',
  templateUrl: './repositories-pagination.component.html',
  styleUrls: ['./repositories-pagination.component.scss'],
})
export class RepositoriesPaginationComponent implements OnChanges {
  @Input() totalRepositories: number = 0;
  @Input() reposPerPage: number = 10;
  @Input() reposCurrentPage: number = 1;

  @Output() selectedPerPage = new EventEmitter<number>();
  @Output() selectedPage = new EventEmitter<number>();

  constructor(private toastr: ToastrService) {}

  userInputPerPage: number = 10;
  entryStart: number = 1;
  entryEnd: number = 1;
  totalPages: number = 1;
  previousPageNumber: number = 1;
  nextPageNumber: number = 1;
  nextNextPageNumber: number = 1;
  previousPreviousPageNumber: number = 1;

  setPerPage() {
    if (this.userInputPerPage < 1) {
      this.toastr.error('0 or negative not possible!', '', {
        positionClass: 'toast-bottom-right',
      });
      return;
    }
    this.selectedPerPage.emit(this.reposPerPage);
  }

  selectRepoPage(pageNumber: number) {
    this.selectedPage.emit(pageNumber);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['reposPerPage'] ||
      changes['totalRepositories'] ||
      changes['reposCurrentPage']
    ) {
      this.entryStart = this.reposPerPage * (this.reposCurrentPage - 1) + 1;
      this.entryEnd =
        Math.min(
          Number(this.entryStart) + Number(this.reposPerPage),
          Number(this.totalRepositories)
        ) - 1;
      this.totalPages = Math.ceil(
        Number(this.totalRepositories) / Number(this.reposPerPage)
      );
      this.previousPageNumber = Number(this.reposCurrentPage) - 1;
      this.previousPreviousPageNumber = Number(this.previousPageNumber) - 1;
      this.nextPageNumber = Number(this.reposCurrentPage) + 1;
      this.nextNextPageNumber = Number(this.nextPageNumber) + 1;
    }
  }
}
