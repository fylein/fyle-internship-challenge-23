import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
 
@Injectable()
export class AppInterceptor implements HttpInterceptor {
 constructor(private router: Router) {
 
 }
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 const token = localStorage.getItem('token');
 const a = localStorage.getItem('formdata');
 const b = localStorage.getItem('userToken')
 const session = sessionStorage.getItem('TOKEN_KEY');
 if (a !== 'true' || a === null) {
 req = req.clone({
    setHeaders: {
        // 'Content-Type': 'application/json',
        'Accept': '*/*',
        'Accept-language': 'en-US,en;q=0.9'
 }
 });
 } else {
 req = req.clone({
 setHeaders: {
 'Accept': 'application/json',
 'Authorization': 'bearer ' + session
 }
 });
 
 }


  
 return next.handle(req).pipe(
 catchError((err: HttpErrorResponse) => {
 if (err.status === 401) {
 localStorage.clear();
 this.router.navigate(['/signin']);
 } else if (err.status === 403) {
 console.log(err);
 }
 return throwError(err);
 })
 )
 }
}