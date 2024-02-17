import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { fetchUserData } from 'src/app/store/actions';
import { getNoRecords } from 'src/app/store/selectors';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}
  public username: string = '';
  public noOfRepos!: number;
  public recordsSub!: Subscription;

  public get(username: string, noOfRepos: number): void {
    this.store.dispatch(
      fetchUserData({ username: username.trim(), noOfRepos, page: 1 })
    );
  }
  ngOnInit(): void {
    this.recordsSub = this.store
      .select(getNoRecords)
      .subscribe((count: number) => (this.noOfRepos = count));
  }
  ngOnDestroy(): void {
    if (this.recordsSub) {
      this.recordsSub.unsubscribe();
    }
  }
}
