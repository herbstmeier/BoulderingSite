import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../models/rating.model';

const baseUrl = 'http://localhost:9000/api/ratings';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  create(data: any) {
    this.http.post(baseUrl, data, { responseType: 'text' }).subscribe({
      complete() { }
    })
  }

  getByBoulder(id: any): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${baseUrl}/boulder/${id}`);
  }

  delete(userId: any, boulderId: any) {
    this.http.delete(baseUrl, { body: { userId, boulderId }, responseType: 'text' }).subscribe({
      complete() { }
    })
  }

  deleteByBoulder(id: any) {
    this.http.delete(`${baseUrl}/boulder/${id}`, { responseType: 'text' }).subscribe({
      complete() { }
    })
  }
}
