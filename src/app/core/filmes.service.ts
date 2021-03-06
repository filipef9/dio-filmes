import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigParams } from '../shared/models/config-params';
import { Filme } from '../shared/models/filme';
import { ConfigParamsService } from './config-params.service';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(
    private http: HttpClient,
    private configParamsService: ConfigParamsService
  ) { }

  salvar(filme: Filme): Observable<Filme> {
    if (filme.id) {
      return this.http.put<Filme>(`${apiUrl}/filmes/${filme.id}`, filme);
    }

    return this.http.post<Filme>(`${apiUrl}/filmes`, filme);
  }

  listar(filtros: ConfigParams): Observable<Filme[]> {
    const params = this.configParamsService.configurarParametros(filtros);
    return this.http.get<Filme[]>(`${apiUrl}/filmes`, { params });
  }

  visualizar(filmeId: number): Observable<Filme> {
    return this.http.get<Filme>(`${apiUrl}/filmes/${filmeId}`);
  }

  excluir(filmeId: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/filmes/${filmeId}`);
  }

}
