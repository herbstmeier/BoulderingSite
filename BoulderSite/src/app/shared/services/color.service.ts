import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color, ColorCreate } from '../models/color.model';

const baseUrl = 'http://localhost:9000/api/colors';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  colors: Color[] = new Array<Color>;

  constructor(private httpClient: HttpClient) { }

  create(data: ColorCreate) {
    this.httpClient.post(baseUrl, data, { responseType: 'text' }).subscribe({
      complete: () => this.getAll()
    });
  }

  getAll() {
    this.httpClient.get<Color[]>(baseUrl).subscribe((data: Color[]) => this.colors = data);
  }

  getById(id: number): Observable<Color> {
    return this.httpClient.get<Color>(`${baseUrl}/${id}`);
  }

  deleteById(id: number) {
    this.httpClient.delete(`${baseUrl}/${id}`, { responseType: 'text' }).subscribe();
  }
}
