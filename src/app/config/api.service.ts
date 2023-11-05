import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
// Import necessary modules and classes from Angular's HttpClient and HttpModule.

import { Injectable } from '@angular/core';
// Import the 'Injectable' decorator to make the class injectable as a service.

import { Observable, throwError } from 'rxjs';
// Import Observable and throwError from RxJS to work with asynchronous operations.

import { catchError } from 'rxjs/operators';
// Import the catchError operator from RxJS to handle errors in observables.

@Injectable()
// Decorate the class as an injectable service.
export class ApiService {
  // Define a class named ApiService.

  csrfToken: string;
  token: string;
  // Declare class properties to store tokens.

  constructor(
    private http: HttpClient
  ) {}
  // Constructor for the ApiService, injecting the HttpClient service for making HTTP requests.

  private formatErrors(httpResponse: any) {
    // Define a private method to format and handle HTTP errors.

    return throwError(httpResponse);
    // Return an observable that emits the error response.
  }

  anonGet(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    // Create a method 'anonGet' to make an anonymous HTTP GET request.

    return this.http.get(
      `${path}`,
      {
        params
      }
    )
    // Use HttpClient to make a GET request to the specified 'path' with optional parameters.

      .pipe(catchError(this.formatErrors));
    // Use the 'pipe' operator to handle errors using the 'formatErrors' method.
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    // Create a method 'get' to make an HTTP GET request.

    return this.http.get(`${path}`,
      {
        params
      }
    )
    // Use HttpClient to make a GET request to the specified 'path' with optional parameters.

      .pipe(catchError(this.formatErrors));
    // Use the 'pipe' operator to handle errors using the 'formatErrors' method.
  }

  getFile(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    // Create a method 'getFile' to retrieve a file via HTTP GET.

    return this.http.get(`${path}`,
      {
        params, responseType: 'arraybuffer'
      }
    )
    // Use HttpClient to make a GET request to the specified 'path' with optional parameters and an 'arraybuffer' response type.

      .pipe(catchError(this.formatErrors));
    // Use the 'pipe' operator to handle errors using the 'formatErrors' method.
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    // Create a method 'delete' to make an HTTP DELETE request.

    return this.http.delete(`${path}`, {
      params
    })
    // Use HttpClient to make a DELETE request to the specified 'path' with optional parameters.

      .pipe(catchError(this.formatErrors));
    // Use the 'pipe' operator to handle errors using the 'formatErrors' method.
  }

  post(path: string, body: Object = {}): Observable<any> {
    // Create a method 'post' to make an HTTP POST request with a JSON body.

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Define headers with a JSON content type.

    return this.http.post(`${path}`,
      JSON.stringify(body), { headers, responseType: 'json' }
    )
    // Use HttpClient to make a POST request to the specified 'path' with a JSON-serialized 'body', headers, and a JSON response type.

      .pipe(catchError(this.formatErrors));
    // Use the 'pipe' operator to handle errors using the 'formatErrors' method.
  }

  postGetFile(path: string, body: Object = {}): Observable<any> {
    // Create a method 'postGetFile' to make an HTTP POST request and retrieve a file.

    return this.http.post(`${path}`, JSON.stringify(body), {
      responseType: 'arraybuffer'
    })
    // Use HttpClient to make a POST request to the specified 'path' with a JSON-serialized 'body' and an 'arraybuffer' response type.

      .pipe(catchError(this.formatErrors));
    // Use the 'pipe' operator to handle errors using the 'formatErrors' method.
  }

  put(path: string, body: Object = {}): Observable<any> {
    // Create a method 'put' to make an HTTP PUT request with a JSON body.

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Define headers with a JSON content type.

    return this.http.put(`${path}`,
      JSON.stringify(body), { headers, responseType: 'json' }
    )
    // Use HttpClient to make a PUT request to the specified 'path' with a JSON-serialized 'body', headers, and a JSON response type.

      .pipe(catchError(this.formatErrors));
    // Use the 'pipe' operator to handle errors using the 'formatErrors' method.
  }

  patch(path: string, body: Object = {}): Observable<any> {
    // Create a method 'patch' to make an HTTP PATCH request with a JSON body.

    return this.http.patch(`${path}`,
      JSON.stringify(body)
    )
    // Use HttpClient to make a PATCH request to the specified 'path' with a JSON-serialized 'body'.

      .pipe(catchError(this.formatErrors));
    // Use the 'pipe' operator to handle errors using the 'formatErrors' method.
  }

  post_text(path: string, body: Object = {}): Observable<any> {
    // Create a method 'post_text' to make an HTTP POST request with plain text body.

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    // Define headers with a text/plain content type.

    return this.http.post(`${path}`,
      JSON.stringify(body), { headers, responseType: 'text' }
    )
    // Use HttpClient to make a POST request to the specified 'path' with a JSON-serialized 'body', headers, and a text response type.

      .pipe(catchError(this.formatErrors));
    // Use the 'pipe' operator to handle errors using the 'formatErrors' method.
  }
}
