import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'visualizar-filme',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  filme: Filme;
  id: number;

  readonly semFoto = 'https://via.placeholder.com/182x268.png?text=Banner+not+found';

  constructor(
    public dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private filmesService: FilmesService
  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.visualizar();
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Desejas realmente excluir o filme?',
        mensagem: 'Caso tenhas certeza, que desejas excluir o filme, clique no botão OK',
        corBotaoSucesso: 'warn',
        labelBotaoSucesso: 'OK',
        corBotaoCancelar: 'primary',
        labelBotaoCancelar: 'Cancelar',
        possuiBotaoFechar: true
      } as Alerta
    };

    const dialogoRef = this.dialog.open(AlertaComponent, config);
    dialogoRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.filmesService.excluir(this.id).subscribe(() => this.router.navigateByUrl('filmes'));
      }
    });

  }

  private visualizar(): void {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme);
  }

}
