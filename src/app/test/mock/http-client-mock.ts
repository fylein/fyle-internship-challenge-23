import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockHttpClient {
  get(url: string): Observable<any> {
    return of({ data: 'mock response' });
  }
}