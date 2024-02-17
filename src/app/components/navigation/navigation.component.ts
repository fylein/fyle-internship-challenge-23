import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserDetails, getPageDetails } from 'src/app/store/selectors';
import { pageHandlers } from 'src/app/store/state';
import { updateNoOfRecords, updatePageNo } from 'src/app/store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  public noRepos!: number;
  public username!: string;
  public currentPage!: number;
  public totalRepos!: number;
  public pageSub!: Subscription;
  public userSub!: Subscription;
  public showRecordsArr: number[] = [10, 25, 50, 100];
  public pagesList: number[] = new Array(5).fill(0).map((v, i) => i + 1);
  public navBy: string[] = ['First', 'Prev', 'Next', 'Last'];

  ngOnInit(): void {
    this.pageSub = this.store
      .select(getPageDetails)
      .subscribe((data: pageHandlers) => {
        this.noRepos = data.showRecords;
        this.currentPage = data.current;
        this.totalRepos = data.total;
      });

    this.userSub = this.store
      .select(getUserDetails)
      .subscribe((user) => (this.username = user.login));
  }

  ngOnDestroy(): void {
    if (this.pageSub) {
      this.pageSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
  setNoRecords(evt: any) {
    this.pagesList = new Array(5).fill(0).map((v, i) => i + 1);
    this.store.dispatch(
      updateNoOfRecords({
        noOfRecords: this.noRepos,
        username: this.username,
        page: 1,
      })
    );
    window.scrollTo(0, 0);
  }

  setPage(page: number, i: number, evt: any) {
    let size = this.pagesList.length - 1;
    const target = evt.target as HTMLElement;
    if (this.totalRepos <= (page - 1) * this.noRepos) {
      // The page would be empty as limit is exceeded
      target.blur();
      return;
    }

    if (i == 0 && this.pagesList[0] != 1) {
      this.pagesList.unshift(this.pagesList[0] - 1);
      this.pagesList.pop();
    } else if (
      i == size &&
      this.totalRepos > (this.currentPage - 1) * this.noRepos
    ) {
      this.pagesList.push(this.pagesList[size] + 1);
      this.pagesList.shift();
    }

    this.store.dispatch(
      updatePageNo({
        page: page,
        username: this.username,
        noOfRecords: this.noRepos,
      })
    );
    window.scrollTo(0, 0);
  }
}
