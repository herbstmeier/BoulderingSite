import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boulder, CreateBoulderModel } from '../models/boulder.model';

const baseUrl = 'http://localhost:9000/api/boulders';

@Injectable({
  providedIn: 'root'
})
export class BoulderService {

  boulders: Boulder[] = new Array<Boulder>;

  constructor(private http: HttpClient) { }

  create(data: CreateBoulderModel): Observable<any> {
    console.log(data);
    return this.http.post(baseUrl, data);
  }

  get(id: number): Observable<Boulder> {
    return this.http.get<Boulder>(`${baseUrl}/${id}`);
  }

  getAll() {
    this.http.get<Boulder[]>(baseUrl).subscribe((data: Boulder[]) => this.boulders = data);
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
