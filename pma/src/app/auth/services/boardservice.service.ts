import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoardCreate, IBoardResponse, apiEnum } from 'src/app/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class BoardserviceService {
  constructor(private http: HttpClient) { }
  apiUrl = apiEnum.base;

  createBoard(data: IBoardCreate): Observable<IBoardResponse> {
    console.log(this.getAllUsers())
    console.log(data)
    return this.http.post<IBoardResponse>(`${this.apiUrl}/${apiEnum.board}`, data, {headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)});
  }

  getAllUsers(){
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,

    })
   return this.http.get(`${this.apiUrl}/users}`, {headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)})

  }

}
