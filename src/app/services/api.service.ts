import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError, Observable, BehaviorSubject } from 'rxjs';

interface Repository {
  id: number;
  name: string;
}

interface Tag {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private searchSubject = new BehaviorSubject<string>(this.getStoredSearchTerm() || 'snarayanank2');
  private total_pages = new BehaviorSubject<number>(0);
  private curr_page = new BehaviorSubject<number>(1);
  private repositories = new BehaviorSubject<any[]>([]);

  constructor(
    private httpClient: HttpClient
  ) { }

  setRepositories(repositories: any[]) {
    this.repositories.next(repositories);
  }

  getRepositories() {
    return this.repositories.asObservable();
  }


  private getStoredSearchTerm(): string {
    return localStorage.getItem('searchTerm') || '';
  }

  setCurrPage(curr_page: number) {
    this.curr_page.next(curr_page);
  }

  getCurrPage() {
    return this.curr_page.asObservable();
  }

  setSearchTerm(term: string) {
    localStorage.setItem('searchTerm', term);
    this.searchSubject.next(term);
  }

  getSearchTerm() {
    return this.searchSubject.asObservable();
  }
  
  setTotalPages(total_pages: number) {
    this.total_pages.next(total_pages);
  }

  getTotalPages() {
    return this.total_pages.asObservable();
  }

  getUser() {
    return this.httpClient.get(`https://api.github.com/users/${this.searchSubject.value}`);
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
  getRepos(): Observable<Repository[]> {
    return this.httpClient.get<any[]>(`https://api.github.com/users/${this.searchSubject.value}/repos?page=${this.curr_page.value}&per_page=8`);
  }

  getLanguages(url: string): Observable<Tag[]> {
    return this.httpClient.get<any[]>(url);
  }
}

