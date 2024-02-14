import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getUserDetails } from 'src/app/store/selectors';
import { userType } from 'src/app/store/state';

@Component({
  selector: 'app-user-bio',
  templateUrl: './user-bio.component.html',
  styleUrls: ['./user-bio.component.scss'],
})
export class UserBioComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}
  public imgURL!: string;
  public userBio!: userType;
  public userDetailsSub!: Subscription;

  ngOnInit(): void {
    this.userDetailsSub = this.store
      .select(getUserDetails)
      .subscribe((data) => {
        this.imgURL = data.avatar_url;
        this.userBio = data;
      });
  }

  ngOnDestroy(): void {
    if (this.userDetailsSub) {
      this.userDetailsSub.unsubscribe();
    }
  }
}
