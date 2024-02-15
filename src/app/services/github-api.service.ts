import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubApiService {
  // Base URL for the GitHub API
  private apiUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  /**
   * @brief Fetches user information from the GitHub API.
   * @param username - The GitHub username to retrieve information for.
   * @returns An observable with the user information.
   */
  getUserInfo(username: string): Observable<any> {
    const userUrl = `${this.apiUrl}/${username}`;
    return this.http.get<any[]>(userUrl);
  }

  /**
   * @brief Fetches user repositories from the GitHub API with pagination.
   * @param username - The GitHub username to retrieve repositories for.
   * @param page - The page number for pagination.
   * @param perPage - The number of repositories per page.
   * @returns An observable with the user repositories.
   */
  getUserRepos(
    username: string,
    page: number,
    perPage: number
  ): Observable<any[]> {
    const userUrl = `${this.apiUrl}/${username}/repos?page=${page}&per_page=${perPage}`;
    return this.http.get<any[]>(userUrl);
  }
}
