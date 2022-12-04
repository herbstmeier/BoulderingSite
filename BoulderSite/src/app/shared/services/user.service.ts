import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUser, SelectSetter, User } from '../models/user.model';
import * as moment from 'moment';

const baseUrl = 'http://localhost:9000/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  setters: SelectSetter[] = new Array<SelectSetter>;

  constructor(private http: HttpClient) { }

  /**
   * Compares the input password with the encrypted password on the database.
   * @param loginData Email and Password
   * @returns An `Observable`
   */
  public login(loginData: AuthUser): Observable<any> {
    return this.http.post<AuthUser>(`${baseUrl}/login`, loginData);
  }

  public getById(id: number): Observable<User> {
    return this.http.get<User>(`${baseUrl}/id/${id}`);
  }

  public getByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${username}`);
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  public getSetters() {
    this.http.get<SelectSetter[]>(`${baseUrl}/setters`).subscribe((data: SelectSetter[]) => this.setters = data);
  }

  public updateInfo(data: User) {
    this.http.put(baseUrl, data, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  public updatePw(data: { id: number, password: string }) {
    this.http.put(`${baseUrl}/password`, data, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  public deleteUser(id: number) {
    this.http.delete(`${baseUrl}/${id}`, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  public deleteAll() {
    this.http.delete(baseUrl, { responseType: 'text' }).subscribe({
      complete() { }
    });
  }

  public setLoggedIn(authResult: { token: string, id: number, username: string, authLevel: number, expiresIn: number }) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    sessionStorage.setItem('token', authResult.token);
    sessionStorage.setItem('user_id', authResult.id.toString());
    sessionStorage.setItem('username', authResult.username.toString());
    sessionStorage.setItem('auth_level', authResult.authLevel.toString());
    sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public setLoggedOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('auth_level');
    sessionStorage.removeItem('expires_at');
    console.log('logged out.');
  }

  public isLoggedIn(): boolean {
    const localExp = sessionStorage.getItem('expires_at');
    if (localExp == null) {
      return false;
    } else {
      const expiresAt = JSON.parse(localExp);
      return moment().isBefore(moment(expiresAt));
    }
  }

  public getUserId(): number {
    const localId: string | null = sessionStorage.getItem('user_id');
    if (localId) {
      return Number.parseInt(localId);
    } else {
      return 0;
    }
  }

  public getUsername(): string {
    const localName: string | null = sessionStorage.getItem('username');
    return localName || '';
  }

  public getUserAuthLevel(): number {
    const localAuth: string | null = sessionStorage.getItem('auth_level');
    if (localAuth) {
      return Number.parseInt(localAuth);
    } else {
      return 0;
    }
  }
}
