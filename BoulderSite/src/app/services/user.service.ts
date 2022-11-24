import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:4200/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data);
  }

  getById(id: any): Observable<User> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  updateInfo(id:any,data:any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  updatePw(data:any): Observable<any> {
    return this.http.put(`${baseUrl}/password`, data);
  }

  deleteUser(id:any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
