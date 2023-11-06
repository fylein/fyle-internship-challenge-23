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
  constructor(private apiService: ApiService) {}

  ngOnInit() {
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
    this.apiService.getUser().subscribe((userJson: any) => {
      this.user = userJson;
      this.apiService.setTotalPages((userJson.public_repos + 5) / 6);
    });
  }
}
