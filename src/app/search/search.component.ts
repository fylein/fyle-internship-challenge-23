import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchTerm: string = '';

  constructor(private apiService: ApiService) {}

  onSearch(): void {
    this.apiService.setSearchTerm(this.searchTerm);
  }

}
