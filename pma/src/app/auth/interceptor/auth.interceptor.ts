import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthserviceService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
    return next.handle(request).pipe(catchError((error: HttpErrorResponse): Observable<never> => {
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.log('error event', error, error.error)
        } else {
        switch (error.status) {
          case 401:
            console.log('Autorization error', error.statusText)
/*             this.auth.logout();
            this.router.navigate(['/auth', 'login'], {
              queryParams: {
                authFailed: true
              }
            }) */
            break;
          case 403: console.log('Access error', error.statusText);
            break;
          case 404: console.log('Route error', error.statusText);
            break;
            case 409: console.log('login already exists', error.statusText);
            break
          case 503: console.log('Server error', error.statusText);
        }
      }
    }
  else {
      console.log('An error occured')
    }
    return throwError(()=>error);
      /* if(error.status === 401) {
        this.auth.logout()
        this.router.navigate(['/auth', 'login'], {
          queryParams: {
            authFailed: true
          } */
}
))}}
