import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  message: string = '';
  isLoading: boolean = false;
  isWrongUsername: boolean = false;
  constructor(private router: Router, private UserData: ApiService) {}

  async onClick() {
    try {
      this.isLoading = true;
      this.isWrongUsername = false;

      //fetching api
      const data = await lastValueFrom(this.UserData.getUser(this.message));
      console.log(data);
      //set lastusedusername prpty
      this.UserData.setLastUsedUsername(this.message);
      //navigate if OK!

      this.router.navigate(['/users', this.message]);
    } catch (err) {
      console.log('Error', err);
      this.isWrongUsername = true;
    } finally {
      this.isLoading = false;
    }
  }
}
