import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes: Filme[] = [];
  generos: string[] = [];

  config: ConfigParams = {
    page: 0,
    limit: 4
  };

  //page = 0
  //readonly limitFilmsByPage = 4;

  //termo: string;
  //genero: string;


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

    this.formFiltrarListagem.get('termo').valueChanges.subscribe((value: string) => {
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
