import { Component,Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  @Input() user: any;
  private searchSubscription!: Subscription;
  isLoading: boolean = false;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.isLoading = true;
    this.searchSubscription = this.apiService.getSearchTerm().subscribe(term => {
      if (term) this.getUser();
    }); 
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  getUser() {
    this.isLoading = true;
    this.apiService.getUser().subscribe((userJson: any) => {
      this.user = userJson;
      this.apiService.setTotalPages(Math.floor((userJson.public_repos + 5) / 6));
      this.apiService.setCurrPage(1);
      this.isLoading = false;
    });
  }
}
