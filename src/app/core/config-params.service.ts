import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigParams } from '../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(filtros: ConfigParams): HttpParams {
    const { page, limit, search, field } = filtros;

    let httpParams = new HttpParams()
      .set('_sort', 'id')
      .set('_order', 'desc');

    if (page) {
      httpParams = httpParams.set('_page', page.toString());
    }

    if (limit) {
      httpParams = httpParams.set('_limit', limit.toString());
    }

    if (search) {
      httpParams = httpParams.set('q', search);
    }

    if (field && field.tipo) {
      httpParams = httpParams.set(field.tipo, field.valor.toString());
    }

    return httpParams;
  }
}
