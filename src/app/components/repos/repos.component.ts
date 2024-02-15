import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { userReposType } from 'src/app/store/state';
import { getUserRepos, selectState } from 'src/app/store/selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}
  public repos!: userReposType[];
  public repoSub!: Subscription;
  public isSm: boolean = false;

  @HostListener('window:resize', ['$evt'])
  onResize(evt: Event): void {
    this.checkScreenSize();
  }
  private checkScreenSize() {
    const width = window.innerWidth;
    this.isSm = width <= 768;
  }
  ngOnInit(): void {
    this.checkScreenSize();
    this.repoSub = this.store.select(getUserRepos).subscribe((data) => {
      this.repos = data;
    });
  }

  ngOnDestroy(): void {
    if (this.repoSub) {
      this.repoSub.unsubscribe();
    }
  }
}
