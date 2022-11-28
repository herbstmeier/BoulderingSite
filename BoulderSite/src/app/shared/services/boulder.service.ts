import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boulder, CreateBoulderModel } from '../models/boulder.model';

const baseUrl = 'http://localhost:4200/boulders';

@Injectable({
  providedIn: 'root'
})
export class BoulderService {

  constructor(private http: HttpClient) { }

  create(data: CreateBoulderModel) {
    this.http.post(baseUrl, data, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  get(id: number): Observable<Boulder> {
    return this.http.get<Boulder>(`${baseUrl}/${id}`);
  }

  getAll(): Observable<Boulder[]> {
    return this.http.get<Boulder[]>(baseUrl);
  }

  update(data: Boulder) {
    this.http.put('baseUrl', data, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  delete(id: number) {
    this.http.delete(`${baseUrl}/${id}`, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  deleteAll() {
    this.http.delete(baseUrl, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }
}
