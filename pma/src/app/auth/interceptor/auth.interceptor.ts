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
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthserviceService, private router: Router, private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
    return next.handle(request).pipe(catchError((error: HttpErrorResponse): Observable<never> => {
      let errorMessage = '';
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.message}`
        } else {
        switch (error.status) {
          case 401:
            errorMessage = 'Autorization error';
/*             this.auth.logout();
            this.router.navigate(['/auth', 'login'], {
              queryParams: {
                authFailed: true
              }
            }) */
            break;
          case 403:
          errorMessage = 'Access error';
            break;
          case 404:
          errorMessage = 'Route error';
            break;
            case 409:
            errorMessage = 'login already exists';
            break
          case 503:
          errorMessage = 'Server error';
        }
      }
    }
  else {
      errorMessage = 'An error occured';
    }
    this.snackBar.open(errorMessage, 'Close');
    return throwError(()=>error);
}
))}}
