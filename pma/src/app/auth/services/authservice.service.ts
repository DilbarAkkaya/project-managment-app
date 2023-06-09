import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAuthData, IAuthResponse, INewUser, ISignData, apiEnum } from '../../models/api.model';
import { Observable, tap, catchError, throwError, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  public error$: Subject<string | null> = new Subject<string|null>()
  constructor(private http: HttpClient, private translate: TranslateService) { }
  apiUrl = apiEnum.base;
  get token(): string | null {
    const tokenExp = localStorage.getItem('token-exp');
    if (!tokenExp) {
      this.logout();
      return null;
    }
    const expDate = new Date(tokenExp);
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return tokenExp;
  }
  signup(data: ISignData): Observable<INewUser | null> {
    return this.http.post<INewUser>(`${this.apiUrl}/${apiEnum.signup}`, data).pipe(tap(this.setUserId));
  }
  login(data: IAuthData): Observable<IAuthResponse | null> {
    return this.http.post<IAuthResponse>(`${this.apiUrl}/${apiEnum.login}`, data).pipe(tap(this.setToken), catchError(this.handleError.bind(this)))
  }
  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error.message;
    let translatedError = errorMessage;

    if (errorMessage === 'Authorization error') {
      this.translate.get('errors.autorization').subscribe((response: string) => {
        translatedError = response;
      })
    }
    if (errorMessage === 'Bad request') {
      this.translate.get('errors.badRequest').subscribe((response: string) => {
        translatedError = response;
      })
    }
    this.error$.next(translatedError)
    return throwError(() => error);
  }
  logout() {
    this.setToken(null);
    localStorage.removeItem('user');
  }
  isAuthenticated(): boolean {
    return !!this.token;
  }
  private setToken(response: IAuthResponse | null) {
    if (response) {
      const expiry = (JSON.parse(atob(response.token.split('.')[1])));
      const expirationTimeInMilliseconds = new Date(expiry.exp * 1000).getTime();
      const expDate = new Date(new Date().getTime() + expirationTimeInMilliseconds);
      const userId = expiry.id;
      localStorage.setItem('token', response.token);
      localStorage.setItem('token-exp', expDate.toString());
      localStorage.setItem('owner', userId);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('token-exp');
      localStorage.removeItem('owner');
      localStorage.removeItem('user');
    }
  }
  private setUserId = (response: INewUser | null) => {
    if (response) {
      localStorage.setItem('owner', response._id.toString());
    }
  }
}
