import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from 'src/app/models/rating.model';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:4200/ratings';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getByBoulder(id: any): Observable<Rating> {
    return this.http.get(`${baseUrl}/boulder/${id}`);
  }

  delete(userId: any, boulderId: any): Observable<any> {
    return this.http.delete(baseUrl, { body: { userId, boulderId } });
  }

  deleteByBoulder(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/boulder/${id}`);
  }
}
