import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserDetails } from 'src/app/store/selectors';
import { userType } from 'src/app/store/state';

@Component({
  selector: 'app-user-bio',
  templateUrl: './user-bio.component.html',
  styleUrls: ['./user-bio.component.scss'],
})
export class UserBioComponent implements OnInit {
  constructor(private store: Store) {}
  imgURL!: string;
  userBio!: userType;
  ngOnInit(): void {
    this.store.select(getUserDetails).subscribe((data) => {
      this.imgURL = data.avatar_url;
      this.userBio = data;
    });
  }
}
