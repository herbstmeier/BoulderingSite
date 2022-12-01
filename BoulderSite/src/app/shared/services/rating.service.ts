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
    this.http.post(baseUrl, data, { responseType: 'text' }).subscribe();
  }

  getByBoulder(id: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${baseUrl}/boulders/${id}`);
  }

  delete(userId: number, boulderId: number) {
    this.http.delete(baseUrl, { body: { userId, boulderId }, responseType: 'text' }).subscribe();
  }

  deleteByBoulder(id: number) {
    this.http.delete(`${baseUrl}/boulders/${id}`, { responseType: 'text' }).subscribe();
  }

  deleteByUser(id: number) {
    this.http.delete(`${baseUrl}/users/${id}`, { responseType: 'text' }).subscribe();
  }
}
