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
    this.http.post(baseUrl, data, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  getByBoulder(id: any): Observable<Climb[]> {
    return this.http.get<Climb[]>(`${baseUrl}/boulder/${id}`);
  }

  getByUser(id: any): Observable<Climb[]> {
    return this.http.get<Climb[]>(`${baseUrl}/user/${id}`);
  }

  delete(uid: any, bid: any) {
    this.http.delete(baseUrl, { body: { uid, bid }, responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  deleteByBoulder(id: any) {
    this.http.delete(`${baseUrl}/boulder/${id}`, { responseType: 'text' }).subscribe({
      complete() { }
    })
  }

  deleteByUser(id: any) {
    this.http.delete(`${baseUrl}/user/${id}`, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }
}
