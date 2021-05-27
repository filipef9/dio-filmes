import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes: Filme[] = [];
  generos: string[] = [];

  page = 0
  readonly limitFilmsByPage = 4;

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

    this.listarFilmes();

    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção científica', 'Comédia', 'Aventura', 'Drama']
  }

  onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.page++;
    this.filmesService
      .listar(this.page, this.limitFilmsByPage)
      .subscribe((filmes: Filme[]) => this.filmes = [...this.filmes, ...filmes]);
  }

}
