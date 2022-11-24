import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Boulder } from 'src/app/models/boulder.model';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:4200/boulders';

@Injectable({
  providedIn: 'root'
})
export class BoulderService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  get(id: any): Observable<Boulder> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getAll(): Observable<Boulder[]> {
    return this.http.get<Boulder[]>(baseUrl);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
}
