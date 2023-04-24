import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IBoardCreate, IBoardResponse, IColumnCreate, IColumnResponse, ITaskCreate, ITaskResponse, IUpdateTask, apiEnum } from 'src/app/models/api.model';
import { catchError, tap } from 'rxjs/operators';
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
    return this.http.post<IBoardResponse>(`${this.apiUrl}/${apiEnum.board}`, data, { headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`) }).pipe(
      tap(() => {
        this._refresh$.next(true);
      })
    );
  }
  getAllBoards(): Observable<IBoardResponse[]> {
    return this.http.get<IBoardResponse[]>(`${this.apiUrl}/boards`).pipe(
      catchError(error => {
        return throwError(()=>error);
      })
    );
  }
  getBoardById(id: string | undefined) {
    return this.http.get<IBoardResponse>(`${this.apiUrl}/boards/${id}`).pipe(
      catchError(error => {
        return throwError(()=>error);
      })
    );
  }
  createColumn(boardId: string, data: IColumnCreate): Observable<IColumnResponse> {
    return this.http.post<IColumnResponse>(`${this.apiUrl}/${apiEnum.board}/${boardId}/columns`, data).pipe(
      tap(() => {
        this._refresh$.next(true);
      })
    )
  }
  getAllColumns(boardId: string): Observable<IColumnResponse[]> {
    return this.http.get<IColumnResponse[]>(`${this.apiUrl}/${apiEnum.board}/${boardId}/columns`).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  getColumnById(boardId: string, columnId: string) {
    return this.http.get<IColumnResponse>(`${this.apiUrl}/boards/${boardId}/columns/${columnId}`).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  createTask(boardId: string, columnId: string, data: ITaskCreate): Observable<ITaskResponse> {
    return this.http.post<ITaskResponse>(`${this.apiUrl}/${apiEnum.board}/${boardId}/columns/${columnId}/tasks`, data).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  getAllTasks(boardId: string, columnId: string): Observable<ITaskResponse[]> {
    return this.http.get<ITaskResponse[]>(`${this.apiUrl}/${apiEnum.board}/${boardId}/columns/${columnId}/tasks`).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  getTaskById(boardId: string, columnId: string, taskId: string) {
    return this.http.get<ITaskResponse>(`${this.apiUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`).pipe(
      catchError(error => {
        return throwError(()=>error);
      })
    );
  }
  deleteTaskById(boardId: string, columnId: string, taskId: string) {
    return this.http.delete<ITaskResponse>(`${this.apiUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`).pipe(
      catchError(error => {
        return throwError(()=>error);
      })
    );
  }
  deleteBoardById(boardId: string) {
    return this.http.delete<IBoardResponse>(`${this.apiUrl}/boards/${boardId}`).pipe(
      catchError(error => {
        return throwError(()=>error);
      })
    );
  }
  deleteColumnById(boardId: string, columnId: string) {
    return this.http.delete<IBoardResponse>(`${this.apiUrl}/boards/${boardId}/columns/${columnId}`).pipe(
      catchError(error => {
        return throwError(()=>error);
      })
    );
  }
  updateTaskById(boardId: string, columnId: string, taskId: string, data: IUpdateTask) {
    return this.http.put<ITaskResponse>(`${this.apiUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, data).pipe(
      catchError(error => {
        return throwError(()=>error);
      })
    );
  }
  updateColumnById(boardId: string, columnId: string, data: IColumnCreate) {
    return this.http.put<IColumnResponse>(`${this.apiUrl}/boards/${boardId}/columns/${columnId}`, data).pipe(
      catchError(error => {
        return throwError(()=>error);
      })
    );
  }
}
