import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAuthData, IAuthResponse, INewUser, ISignData, apiEnum } from '../../models/api.model';
import { Observable, tap, catchError, throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  public error$: Subject<string> = new Subject<string>()
  constructor(private http: HttpClient) { }
  apiUrl = apiEnum.base;

  get token(): string | null{
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

  signup(data:ISignData):Observable<INewUser | null>{
    console.log(data)
    return this.http.post<INewUser>(`${this.apiUrl}/${apiEnum.signup}`, data).pipe(tap(this.setUserId));
  }

  login(data: IAuthData): Observable<IAuthResponse | null> {
    console.log(data)
    return this.http.post<IAuthResponse>(`${this.apiUrl}/${apiEnum.login}`, data).pipe(tap(this.setToken), catchError(this.handleError.bind(this)))
  }
  private handleError(error: HttpErrorResponse) {
   const errorMessage = error.error.message;
   if (errorMessage === 'Authorization error') {this.error$.next('Incorrect login or password')}
   if (errorMessage === 'Bad request') {this.error$.next('Something went wrong')};
   return throwError(() => error);
  }

  logout(){
  this.setToken(null)
  }
  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: IAuthResponse | null) {

    if (response) {
      console.log(response)
      const expiry = (JSON.parse(atob(response.token.split('.')[1])));
      const expirationTimeInMilliseconds = new Date(expiry.exp * 1000).getTime();
      const expDate = new Date(new Date().getTime() + expirationTimeInMilliseconds);
      const userId = expiry.id;

      console.log(userId)
      localStorage.setItem('token', response.token);
      localStorage.setItem('token-exp', expDate.toString());
      localStorage.setItem('owner', userId);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('token-exp');
      localStorage.removeItem('owner');
    }
  }
  private setUserId = (response: INewUser | null) => {
    if (response){
      console.log('dkdkkdk', response._id)
      localStorage.setItem('owner', response._id.toString())
    }
  }
}
