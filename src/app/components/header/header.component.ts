import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private sharedData: SharedDataService) {}

  searchUser(userName: string) {
    this.sharedData.updateSearchedUser(userName);
  }
}
