import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INewUser, apiEnum } from 'src/app/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  apiUrl = apiEnum.base;


/*   getAllUsers(){
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,

    })
   return this.http.get(`${this.apiUrl}/users}`, {headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)})

  } */
  getAllUsers(){
 return this.http.get(`${this.apiUrl}/users`);
  }
  getUser(id: string){
    return this.http.get(`${this.apiUrl}/users/${id}`);
     }
  updateUser(id: string, data: INewUser) {
    return this.http.put(`${this.apiUrl}/users/${id}`, data);
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
