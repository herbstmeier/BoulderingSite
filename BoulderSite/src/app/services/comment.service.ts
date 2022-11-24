import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:4200/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getByBoulder(id: any): Observable<Comment> {
    return this.http.get(`${baseUrl}/boulder/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteByBoulder(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/boulder/${id}`);
  }
}
