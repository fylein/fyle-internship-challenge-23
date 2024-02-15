import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { Store } from '@ngrx/store';
import { getLoadError, selectState } from './store/selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}
  public responseLength!: number;
  public loadError!: Record<string, boolean>;
  public dataLengthSub!: Subscription;
  public loadErrorSub!: Subscription;

  ngOnInit() {
    console.log('Hello Devs!');
    this.dataLengthSub = this.store.select(selectState).subscribe((data) => {
      console.log(data);
      this.responseLength = data.repos.length;
    });
    this.loadErrorSub = this.store.select(getLoadError).subscribe((data) => {
      this.loadError = data;
    });
  }
  ngOnDestroy() {
    if (this.dataLengthSub) {
      this.dataLengthSub.unsubscribe();
    }
    if (this.loadErrorSub) {
      this.loadErrorSub.unsubscribe();
    }
  }
}
