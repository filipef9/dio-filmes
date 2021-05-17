import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filme } from '../shared/models/filme';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
  
  constructor(private http: HttpClient) { }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(`${environment.apiUrl}/filmes`, filme);
  }

}
