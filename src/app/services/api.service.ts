
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { getRepos } from 'data-type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }


  getAllRepo(data:getRepos): Observable<any>{
    return this.http.get(`https://api.github.com/users/${data.owner}/repos`)
  }
  getAllBranches(ele:any): Observable<any>{
    return this.http.get(`https://api.github.com/repos/${ele}/branches`)
  }
  getAllIssue(ele:any): Observable<any>{
    return this.http.get(`https://api.github.com/repos/${ele}/issues`)
  }
  getAllCommit(arr:any): Observable<any>{
    return this.http.get(`https://api.github.com/repos/${arr}/commits`)
  }
  getBranchDate(url:any): Observable<any>{
    return this.http.get(`${url}`)
  }
}
