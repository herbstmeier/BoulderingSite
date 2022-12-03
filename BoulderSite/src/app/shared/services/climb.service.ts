import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Climb } from '../models/climb.model';

const baseUrl = 'http://localhost:9000/api/climbs';

@Injectable({
  providedIn: 'root'
})
export class ClimbService {

  constructor(private http: HttpClient) { }

  create(data: any) {
    this.http.post(baseUrl, data, { responseType: 'text' }).subscribe();
  }

  getByBoulder(id: number): Observable<Climb[]> {
    return this.http.get<Climb[]>(`${baseUrl}/boulders/${id}`);
  }

  getByUser(id: number): Observable<Climb[]> {
    return this.http.get<Climb[]>(`${baseUrl}/users/${id}`);
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
