import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuthData, IAuthResponse, INewUser, ISignData, apiEnum } from '../models/api.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }
  apiUrl = apiEnum.base;
  get token(): string {
    return '';
  }
  signup(data:ISignData):Observable<INewUser>{
    console.log(data)
    return this.http.post<INewUser>(`${this.apiUrl}/${apiEnum.signup}`, data);
  }
  login(data: IAuthData): Observable<IAuthResponse> {
    console.log(data)
    return this.http.post(`${this.apiUrl}/${apiEnum.login}`, data).pipe(tap(this.setToken))
  }
  logout(){

  }
  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(res: any) {
    console.log(res.token)
   const expiry = (JSON.parse(atob(String(res.token).split('.')[1]))).exp;
   console.log(expiry)
  }
}
