import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private searchedUserSubject = new BehaviorSubject<string>('');
  searchedUser$ = this.searchedUserSubject.asObservable();

  updateSearchedUser(userName: string) {
    this.searchedUserSubject.next(userName);
  }
}