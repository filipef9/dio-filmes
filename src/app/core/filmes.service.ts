import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filme } from '../shared/models/filme';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(`${apiUrl}/filmes`, filme);
  }

  listar(): Observable<Filme[]> {
    return this.http.get<Filme[]>(`${apiUrl}/filmes`);
  }

}
