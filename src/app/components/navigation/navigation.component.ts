import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getCurrentPage,
  getNoRecords,
  getTotalNoRepos,
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
  constructor(private store: Store) {}

  public noRepos!: number;
  public username!: string;
  public currentPage!: number;
  public totalRepos!: number;
  public showRecordsArr: number[] = [10, 25, 50, 100];
  public pagesList: number[] = new Array(3).fill(0).map((v, i) => i + 1);
  public navBy: string[] = ['First', 'Prev', 'Next', 'Last'];

  ngOnInit() {
    this.store
      .select(getNoRecords)
      .subscribe((data: number) => (this.noRepos = data));
    this.store
      .select(getUserDetails)
      .subscribe((user) => (this.username = user.login));
    this.store
      .select(getCurrentPage)
      .subscribe((data) => (this.currentPage = data));
    this.store
      .select(getTotalNoRepos)
      .subscribe((data) => (this.totalRepos = data));
  }

  setNoRecords(evt: any) {
    this.store.dispatch(
      updateNoOfRecords({
        noOfRecords: this.noRepos,
        username: this.username,
        page: 1,
      })
    );
  }

  setPage(page: number, i: number) {
    let size = this.pagesList.length - 1;
    if (i == 0 && this.pagesList[0] != 1) {
      this.pagesList.unshift(this.pagesList[0] - 1);
      this.pagesList.pop();
    } else if (
      i == size &&
      this.totalRepos > (this.currentPage - 1) * this.noRepos
    ) {
      this.pagesList.push(this.pagesList[size] + 1);
      this.pagesList.shift();
      console.log(this.pagesList);
    }
    this.store.dispatch(
      updatePageNo({
        page: page,
        username: this.username,
        noOfRecords: this.noRepos,
      })
    );
  }
}
