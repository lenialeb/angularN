import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface comment {
  userName: string;
  content: string;
  date: string;
}
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:8888/comment';

  postComments(productId: string, comment: { userName: string; content: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${productId}`, comment);
  }
  getComments(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`);
  }
}
