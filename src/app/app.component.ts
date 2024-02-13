import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { fetchUserData } from './store/actions';
import { Store } from '@ngrx/store';
import { selectState } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService, private store: Store) {}
  public responseLength!: number;

  ngOnInit() {
    this.store
      .select(selectState)
      .subscribe((data) => (this.responseLength = data.repos.length));
  }
}
