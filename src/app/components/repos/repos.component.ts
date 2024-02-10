import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { userReposType } from 'src/app/store/state';
import { getUserRepos, selectState } from 'src/app/store/selectors';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  constructor(private store: Store) {}
  public repos!: userReposType[];
  public isSm: boolean = false;

  @HostListener('window:resize', ['$evt'])
  onResize(evt: Event): void {
    this.checkScreenSize();
  }
  private checkScreenSize() {
    const width = window.innerWidth;
    this.isSm = width <= 768;
  }
  ngOnInit() {
    this.checkScreenSize();
    this.store.select(getUserRepos).subscribe((data) => {
      console.log(data);
      this.repos = data;
    });
    this.store.select(selectState).subscribe((data) => {
      console.log(data);
    });
  }
}
