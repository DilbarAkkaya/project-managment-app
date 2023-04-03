import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INewUser, ISignData, apiEnum } from '../models/api.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }
  apiUrl = apiEnum.base;
  signup(data:ISignData):Observable<INewUser>{
    console.log(data)
    return this.http.post<INewUser>(`${this.apiUrl}/${apiEnum.signup}`, data);
  }
}
