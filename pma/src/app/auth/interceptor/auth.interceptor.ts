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
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthserviceService, private router: Router, private snackBar: MatSnackBar, private translate: TranslateService) { }

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
            errorMessage = this.translate.instant('errors.authorizationError');
/*             this.auth.logout();
            this.router.navigate(['/auth', 'login'], {
              queryParams: {
                authFailed: true
              }
            }) */
            break;
          case 403:
          errorMessage = this.translate.instant('errors.accessError')
            break;
          case 404:
          errorMessage = this.translate.instant('errors.routeError')
            break;
            case 409:
            errorMessage = this.translate.instant('errors.loginError')
            break
          case 503:
          errorMessage = this.translate.instant('errors.serverError')
        }
      }
    }
  else {
      errorMessage = this.translate.instant('errors.unknownError')
    }
    this.snackBar.open(errorMessage, this.translate.instant('errors.closeSnack'), {
      duration: 2000,
      horizontalPosition: 'right',
      panelClass: ['warning'],
    });
    return throwError(()=>error);
}
))}}
