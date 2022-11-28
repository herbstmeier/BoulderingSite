import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Set } from '../models/set.model';

const baseUrl = 'http://localhost:4200/sets';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  constructor(private http: HttpClient) { }

  create(data: any) {
    this.http.post(baseUrl, data, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  getByBoulder(id: any): Observable<Set[]> {
    return this.http.get<Set[]>(`${baseUrl}/boulder/${id}`);
  }

  getBySetter(id: any): Observable<Set[]> {
    return this.http.get<Set[]>(`${baseUrl}/setter/${id}`);
  }

  delete(setterId: any, boulderId: any) {
    this.http.delete(baseUrl, { body: { setterId, boulderId }, responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  deleteByBoulder(id: any) {
    this.http.delete(`${baseUrl}/boulder/${id}`, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }
}
