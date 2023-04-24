import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject, catchError, throwError } from 'rxjs';
import { IUpdateUser, apiEnum } from 'src/app/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public error$: Subject<string> = new Subject<string>();
  private userUpdate = new BehaviorSubject<string | null>(null);
  user$ = this.userUpdate.asObservable();
  constructor(private http: HttpClient, private translate: TranslateService) { }
  apiUrl = apiEnum.base;
  getAllUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }
  getUser(id: string) {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }
  updateUser(id: string, data: IUpdateUser) {
    return this.http.put(`${this.apiUrl}/users/${id}`, data).pipe(catchError(this.handleError.bind(this)));
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/users/${id}`).pipe(catchError(this.handleError.bind(this)));
  }
  setUser(user: string) {
    this.userUpdate.next(user);
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
}
