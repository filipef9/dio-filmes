import { HttpClient, HttpParams } from '@angular/common/http';
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

  listar(
    page: number,
    limitRecordsByPage: number,
    termo: string,
    genero: string
  ): Observable<Filme[]> {
    let httpParams = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limitRecordsByPage.toString())
      .set('_sort', 'id')
      .set('_order', 'desc');

    if (termo) {
      httpParams = httpParams.set('q', termo);
    }

    if (genero) {
      httpParams = httpParams.set('genero', genero);
    }

    return this.http.get<Filme[]>(`${apiUrl}/filmes`, { params: httpParams });
  }

}
