import { Injectable } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() { }

  hasErrorValidar(control: AbstractControl, errorName: string): boolean {
    const hasError: boolean = control.hasError(errorName);
    return ((control.touched || control.dirty) && hasError);
  }

}
