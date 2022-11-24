import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Climb } from 'src/app/models/climb.model';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:4200/climbs';

@Injectable({
  providedIn: 'root'
})
export class ClimbService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getByBoulder(id: any): Observable<Climb> {
    return this.http.get(`${baseUrl}/boulder/${id}`);
  }

  getByUser(id: any): Observable<Climb> {
    return this.http.get(`${baseUrl}/user/${id}`);
  }

  delete(uid: any, bid: any): Observable<any> {
    return this.http.delete(baseUrl, { body: { uid, bid } });
  }

  deleteByBoulder(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/boulder/${id}`)
  }

  deleteByUser(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/user/${id}`);
  }
}
