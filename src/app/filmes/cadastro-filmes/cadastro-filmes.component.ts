import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: string[];

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmesService: FilmesService
  ) { }

  ngOnInit(): void {
    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });

    this.generos = [
      'Ação',
      'Aventura',
      'Ficção Científica',
      'Romance',
      'Terror'
    ];
  }

  get f() {
    return this.cadastro.controls;
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) return;

    const filmToSave = this.cadastro.getRawValue() as Filme;
    this.salvar(filmToSave);
  }

  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe(() => {
      const config = {
        data: {
          titulo: 'Sucesso!!!',
          mensagem: 'O filme foi cadastrado com sucesso!',
          labelBotaoSucesso: 'Ir para a listagem',
          labelBotaoCancelar: 'Cadastrar um novo filme',
          corBotaoCancelar: 'primary',
          possuiBotaoFechar: true
        } as Alerta
      };

      const dialogRef = this.dialog.open(AlertaComponent, config);
    },
      () => {
        console.log('ERROR AO SALVAR!!!');
      });
  }

  reiniciarForm(): void {

  }

}
