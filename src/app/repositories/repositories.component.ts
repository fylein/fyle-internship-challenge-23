import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent {
  @Input() userRepos: any[] = [];
  @Output() updateItemsPerPageChange = new EventEmitter<number>();

  setItemsPerPageChange(itemsPerPage: number) {
    this.updateItemsPerPageChange.emit(itemsPerPage);
  }
}
