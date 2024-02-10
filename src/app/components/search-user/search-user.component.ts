import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchUserData } from 'src/app/store/actions';
import { getNoRecords } from 'src/app/store/selectors';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit {
  constructor(private store: Store) {}
  public username: string = '';
  public noOfRepos!: number;

  public get(username: string, noOfRepos: number) {
    this.store.dispatch(fetchUserData({ username, noOfRepos }));
  }
  ngOnInit(): void {
    this.store
      .select(getNoRecords)
      .subscribe((count: number) => (this.noOfRepos = count));
  }
}
