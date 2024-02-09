import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchUserDataService {

  constructor(private http: HttpClient) { }

  fetchData(apiUrl: string): Observable<any> {
    return this.http.get<any>(apiUrl);
  }
  
}
