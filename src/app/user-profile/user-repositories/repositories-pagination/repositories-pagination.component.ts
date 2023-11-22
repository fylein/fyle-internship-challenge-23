import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repositories-pagination',
  templateUrl: './repositories-pagination.component.html',
  styleUrls: ['./repositories-pagination.component.scss'],
})
export class RepositoriesPaginationComponent {
  @Input() totalRepositories: number = 0;
  @Input() reposPerPage: number = 10;
  @Input() reposCurrentPage: number = 1;
}
