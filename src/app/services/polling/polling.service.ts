import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { of, timer } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PollingService {
  private octokit: Octokit;

  constructor() {
    const token = environment.token;
    this.octokit = new Octokit({
      auth: token,
    });
  }

  // Every 120s , cache is burst

  startTimer = (): Observable<any> => {
    return timer(0, 1000 * 60 * 2);
  };
}
