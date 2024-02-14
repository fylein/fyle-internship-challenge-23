import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PollingService {
  constructor() {}

  // Every 120s , cache is burst

  startTimer = (): Observable<any> => {
    return timer(0, 1000 * 60 * 2);
  };
}
