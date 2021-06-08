import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'visualizar-filme',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  filme: Filme;

  readonly semFoto = 'https://via.placeholder.com/182x268.png?text=Banner+not+found';

  constructor(
    private activateRoute: ActivatedRoute,
    private filmesService: FilmesService
  ) { }

  ngOnInit() {
    const filmeId = this.activateRoute.snapshot.params['id'];
    this.visualizar(filmeId);
  }

  private visualizar(filmeId: number): void {
    this.filmesService.visualizar(filmeId).subscribe((filme: Filme) => this.filme = filme);
  }

}
