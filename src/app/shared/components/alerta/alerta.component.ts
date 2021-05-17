import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alerta } from '../../models/alerta';

@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  alerta = {
    titulo: 'Título da Modal',
    mensagem: 'Mensagem da Modal',
    labelBotaoSucesso: 'Botão Sucesso',
    labelBotaoCancelar: 'Botão Cancelar',
    corBotaoSucesso: 'accent',
    corBotaoCancelar: 'warn',
    possuiBotaoFechar: false
  } as Alerta;

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: Alerta
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.alerta.titulo = this.data.titulo || this.alerta.titulo;
      this.alerta.mensagem = this.data.mensagem || this.alerta.mensagem;
      this.alerta.labelBotaoSucesso = this.data.labelBotaoSucesso || this.alerta.labelBotaoSucesso;
      this.alerta.labelBotaoCancelar = this.data.labelBotaoCancelar || this.alerta.labelBotaoCancelar;
      this.alerta.corBotaoSucesso = this.data.corBotaoSucesso || this.alerta.corBotaoSucesso;
      this.alerta.corBotaoCancelar = this.data.corBotaoCancelar || this.alerta.corBotaoCancelar;
      this.alerta.possuiBotaoFechar = this.data.possuiBotaoFechar || this.alerta.possuiBotaoFechar;
    }
  }

}
