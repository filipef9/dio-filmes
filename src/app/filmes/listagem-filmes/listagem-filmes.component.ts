import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = 'https://via.placeholder.com/182x268.png?text=Banner+not+found';

  filmes: Filme[] = [];
  generos: string[] = [];

  config: ConfigParams = {
    page: 0,
    limit: 4
  };

  formFiltrarListagem: FormGroup;

  constructor(
    private filmesService: FilmesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formFiltrarListagem = this.fb.group({
      termo: [''],
      genero: ['']
    });

    this.formFiltrarListagem.get('termo').valueChanges
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        this.config.search = value;
        this.resetarConsulta();
      });

    this.formFiltrarListagem.get('genero').valueChanges.subscribe((value: string) => {
      this.config.field = { tipo: 'genero', valor: value };
      this.resetarConsulta();
    });

    this.listarFilmes();

    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção científica', 'Comédia', 'Aventura', 'Drama']
  }

  onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.config.page++;
    this.filmesService
      .listar(this.config)
      .subscribe((filmes: Filme[]) => this.filmes = [...this.filmes, ...filmes]);
  }

  private resetarConsulta(): void {
    this.config.page = 0;
    this.filmes = [];
    this.listarFilmes();
  }

}
