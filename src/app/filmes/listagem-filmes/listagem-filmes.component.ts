import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes: Filme[] = [];

  page = 0
  readonly limitFilmsByPage = 4;

  constructor(private filmesService: FilmesService) { }

  ngOnInit(): void {
    this.listarFilmes();
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
