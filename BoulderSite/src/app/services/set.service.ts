import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Set } from 'src/app/models/set.model';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:4200/sets';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getByBoulder(id: any): Observable<Set> {
    return this.http.get(`${baseUrl}/boulder/${id}`);
  }

  getBySetter(id: any): Observable<Set> {
    return this.http.get(`${baseUrl}/setter/${id}`);
  }

  delete(setterId: any, boulderId: any): Observable<any> {
    return this.http.delete(baseUrl, { body: { setterId, boulderId } });
  }

  deleteByBoulder(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/boulder/${id}`);
  }
}
