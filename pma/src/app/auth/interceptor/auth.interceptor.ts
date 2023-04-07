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
  constructor(private auth: AuthserviceService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      console.log('[Interceptor error]:', error)
      if(error.status === 401) {
        this.auth.logout()
        this.router.navigate(['/auth', 'login'], {
          queryParams: {
            authFailed: true
          }
        })
      }
      return throwError(error)
    })
    )

  }
}
