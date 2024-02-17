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
  public loadError!: Record<string, boolean>;
  public loadErrorSub!: Subscription;

  ngOnInit() {
    console.log('Hello Devs!');
    this.loadErrorSub = this.store.select(getLoadError).subscribe((data) => {
      this.loadError = data;
    });
  }
  ngOnDestroy() {
    if (this.loadErrorSub) {
      this.loadErrorSub.unsubscribe();
    }
  }
}
