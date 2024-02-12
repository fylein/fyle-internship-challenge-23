import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getNoRecords,
  getUserDetails,
  selectState,
} from 'src/app/store/selectors';
import { updateNoOfRecords, updatePageNo } from 'src/app/store/actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public noRepos!: number;
  public username!: string;
  public showRecordsArr: number[] = [10, 25, 50, 100];
  public pagesList: number[] = new Array(10).fill(0).map((v, i) => i + 1);
  public navBy: string[] = ['First', 'Prev', 'Next', 'Last'];
  constructor(private store: Store) {}
  ngOnInit() {
    console.log(this.pagesList);
    this.store
      .select(getNoRecords)
      .subscribe((data: number) => (this.noRepos = data));
    this.store
      .select(getUserDetails)
      .subscribe((user) => (this.username = user.login));
  }

  setNoRecords(evt: any) {
    console.log(this.noRepos);
    this.store.dispatch(
      updateNoOfRecords({
        noOfRecords: this.noRepos,
        username: this.username,
        page: 1,
      })
    );
  }

  setPage(page: number) {
    this.store.dispatch(
      updatePageNo({
        page: page,
        username: this.username,
        noOfRecords: this.noRepos,
      })
    );
  }
}
