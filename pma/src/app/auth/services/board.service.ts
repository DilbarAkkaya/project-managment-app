import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoardCreate, IBoardResponse, IColumnResponse, apiEnum } from 'src/app/models/api.model';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BoardserviceService {
  constructor(private http: HttpClient) { }
  apiUrl = apiEnum.base;

  createBoard(data: IBoardCreate): Observable<IBoardResponse> {
    console.log(data)
    return this.http.post<IBoardResponse>(`${this.apiUrl}/${apiEnum.board}`, data, {headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)});
  }
  getAllBoards(){
    return this.http.get(`${this.apiUrl}/boards`)
     }
  getBoardById(id: string|undefined) {
      return this.http.get<IBoardResponse>(`${this.apiUrl}/boards/${id}`)
       }
       createColumn(boardId: string| undefined, data: IBoardCreate): Observable<IColumnResponse> {
        console.log(data)
        return this.http.post<IColumnResponse>(`${this.apiUrl}/${apiEnum.board}/${boardId}/columns`, data)}
}
