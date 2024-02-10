import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getNoRecords, getUserDetails } from 'src/app/store/selectors';
import { updateNoOfRecords } from 'src/app/store/actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public noRepos!: number;
  public username!: string;
  public showRecordsArr: number[] = [10, 25, 50, 100];
  constructor(private store: Store) {
    this.store
      .select(getNoRecords)
      .subscribe((data: number) => (this.noRepos = data));
    this.store
      .select(getUserDetails)
      .subscribe((user) => (this.username = user.login));
  }

  handleChange(evt: any) {
    this.store.dispatch(
      updateNoOfRecords({ noOfRecords: this.noRepos, username: this.username })
    );
  }
}
