import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { Store } from '@ngrx/store';
import { selectState } from './store/selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}
  public responseLength!: number;
  public dataLengthSub!: Subscription;

  ngOnInit() {
    this.dataLengthSub = this.store
      .select(selectState)
      .subscribe((data) => (this.responseLength = data.repos.length));
  }
  ngOnDestroy() {
    console.log('Im getting destroyed');
    if (this.dataLengthSub) {
      this.dataLengthSub.unsubscribe();
    }
  }
}
