import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchUserData } from 'src/app/store/actions';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent {
  constructor(private store: Store) {}
  public username: string = '';
  public get(username: string) {
    this.store.dispatch(fetchUserData({ username }));
  }
}
