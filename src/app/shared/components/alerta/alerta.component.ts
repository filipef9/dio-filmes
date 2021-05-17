import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  titulo = 'Título da Modal';
  mensagem = 'Mensagem da Modal';
  labelBtnSucesso = 'Botão Sucesso';
  labelBtnCancelar = 'Botão Cancelar';
  corBotaoSucesso = 'primary';
  possuiBotaoFechar = false;

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }

  ngOnInit(): void {
    if(this.data) {
      this.titulo = this.data.titulo || this.titulo;
      this.mensagem = this.data.mensagem || this.mensagem;
      this.labelBtnSucesso = this.data.labelBtnSucesso || this.labelBtnSucesso;
      this.labelBtnCancelar = this.data.labelBtnCancelar || this.labelBtnCancelar;
      this.corBotaoSucesso = this.data.corBotaoSucesso || this.corBotaoSucesso;
      this.possuiBotaoFechar = this.data.possuiBotaoFechar || this.possuiBotaoFechar;
    }
  }

}
