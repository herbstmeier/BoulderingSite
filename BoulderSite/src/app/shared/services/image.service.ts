import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:9000/api/images';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private httpClient: HttpClient) { }

  public upload(dest: string, id: number, img: FormData): Observable<string> {
    return this.httpClient.post<string>(`${baseUrl}/${dest}/${id}`, img);
  }

  public delete(dest: string, id: number, filename: string) {
    this.httpClient.delete(`${baseUrl}/${dest}/${id}/${filename}`, {responseType: 'text'}).subscribe();
  }
}
