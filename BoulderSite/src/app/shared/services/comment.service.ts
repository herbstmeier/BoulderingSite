import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

const baseUrl = 'http://localhost:9000/api/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  create(data: any) {
    this.http.post(baseUrl, data, { responseType: 'text' }).subscribe();
  }

  getByBoulder(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${baseUrl}/boulders/${id}`);
  }

  update(id: number, data: any) {
    this.http.put(`${baseUrl}/${id}`, data, { responseType: 'text' }).subscribe();
  }

  delete(id: number) {
    this.http.delete(`${baseUrl}/${id}`, { responseType: 'text' }).subscribe();
  }

  deleteByBoulder(id: number) {
    this.http.delete(`${baseUrl}/boulders/${id}`, { responseType: 'text' }).subscribe();
  }

  deleteByUser(id: number) {
    this.http.delete(`${baseUrl}/users/${id}`, { responseType: 'text' }).subscribe();
  }
}
