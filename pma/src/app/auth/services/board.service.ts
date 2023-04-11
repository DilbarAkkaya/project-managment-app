import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { IBoardCreate, IBoardResponse, IColumnCreate, IColumnResponse, ITaskCreate, ITaskResponse, apiEnum } from 'src/app/models/api.model';
import {catchError, map, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BoardserviceService {
  constructor(private http: HttpClient) { }
  apiUrl = apiEnum.base;
  private _refresh$ = new BehaviorSubject<boolean>(true);
  get refresh$() {
    return this._refresh$.asObservable();
  }
  createBoard(data: IBoardCreate): Observable<IBoardResponse> {
    console.log(data)
    return this.http.post<IBoardResponse>(`${this.apiUrl}/${apiEnum.board}`, data, {headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)}).pipe(
      tap(()=>{
        this._refresh$.next(true);
      })
    );
  }
  getAllBoards(): Observable<IBoardResponse[]>{
    return this.http.get<IBoardResponse[]>(`${this.apiUrl}/boards`)
     }
  getBoardById(id: string | undefined) {
    return this.http.get<IBoardResponse>(`${this.apiUrl}/boards/${id}`)
  }
  createColumn(boardId: string, data: IColumnCreate): Observable<IColumnResponse> {
    console.log(data, 'creating')
    console.log(boardId)
    return this.http.post<IColumnResponse>(`${this.apiUrl}/${apiEnum.board}/${boardId}/columns`, data).pipe(
      tap(()=>{
        this._refresh$.next(true);
      })
    )
  }
  getAllColumns(boardId: string): Observable<IColumnResponse[]> {
    return this.http.get<IColumnResponse[]>(`${this.apiUrl}/${apiEnum.board}/${boardId}/columns`).pipe(
      tap(columns => console.log('Columns:', columns)),
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  getColumnById(boardId: string, columnId: string) {
    console.log(boardId, columnId)
    return this.http.get<IColumnResponse>(`${this.apiUrl}/boards/${boardId}/columns/${columnId}`)
  }
  createTask(boardId: string, columnId: string, data: ITaskCreate): Observable<ITaskResponse> {
    console.log(data, 'creating')
    console.log(boardId)
    return this.http.post<ITaskResponse>(`${this.apiUrl}/${apiEnum.board}/${boardId}/columns/${columnId}/tasks`, data).pipe(
      tap(()=>{
        this._refresh$.next(true);
      })
    )
  }
  getAllTasks(boardId: string, columnId: string): Observable<ITaskResponse[]> {
    return this.http.get<ITaskResponse[]>(`${this.apiUrl}/${apiEnum.board}/${boardId}/columns/${columnId}/tasks`).pipe(
      tap(tasks => console.log('777777777777tasks:',tasks)),
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}
