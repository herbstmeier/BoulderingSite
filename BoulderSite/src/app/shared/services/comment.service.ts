import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

const baseUrl = 'http://localhost:4200/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  create(data: any) {
    this.http.post(baseUrl, data, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  getByBoulder(id: any): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${baseUrl}/boulder/${id}`);
  }

  update(id: any, data: any) {
    this.http.put(`${baseUrl}/${id}`, data, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  delete(id: any) {
    this.http.delete(`${baseUrl}/${id}`, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  deleteByBoulder(id: any) {
    this.http.delete(`${baseUrl}/boulder/${id}`, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }
}
