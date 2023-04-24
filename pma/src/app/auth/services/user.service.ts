import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, catchError, throwError } from 'rxjs';
import { INewUser, IUpdateUser, apiEnum } from 'src/app/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public error$: Subject<string> = new Subject<string>()
  constructor(private http: HttpClient, private translate: TranslateService) { }
  apiUrl = apiEnum.base;
  getAllUsers(){
 return this.http.get(`${this.apiUrl}/users`);
  }
  getUser(id: string){
    return this.http.get(`${this.apiUrl}/users/${id}`);
     }
  updateUser(id: string, data: IUpdateUser) {
    return this.http.put(`${this.apiUrl}/users/${id}`, data).pipe(catchError(this.handleError.bind(this)));
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/users/${id}`).pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error.message;
    let translatedError = errorMessage;

    if (errorMessage === 'Authorization error') {
     console.log('AUTO', translatedError)
     this.translate.get('errors.autorization').subscribe((response: string) => {
       translatedError = response;

     })
   }
    /*  this.error$.next('Incorrect login or password') */
    if (errorMessage === 'Bad request') {
     console.log('bad', translatedError)
     /* this.error$.next('Something went wrong') */;
     this.translate.get('errors.badRequest').subscribe((response: string) => {
       translatedError = response;
     })
   }
     this.error$.next(translatedError)
    return throwError(() => error);
   }
}
