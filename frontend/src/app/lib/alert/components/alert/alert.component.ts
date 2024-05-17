import { Component, Input } from '@angular/core';

export interface AlertOptions {
  title: string;
  body: string;
  imageUrl?: string;
  icon?: string;
  showCancelButton?: boolean;
  textConfirmButton?: string;
  textCancelButton?: string;
  alertType?: 'SUCCESS' | 'INFO' | 'DANGER' | 'WARNING'
}

export enum AlertRole {
  confirmed,
  cancelled
}

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() alertOptions!: AlertOptions;

  @Input() dismiss!: (role: AlertRole) => void;

  protected alertRole = AlertRole;

  protected _getImageUrl(): string {
    if (this.alertOptions.imageUrl) {
      return this.alertOptions.imageUrl;
    }

    return '';

  }

  protected _getTextCancelButton(): string {
    return this.alertOptions.textCancelButton ?? 'Cancelar'
  }

  protected _getTextConfirmButton(): string {
    return this.alertOptions.textConfirmButton ?? 'Confirmar'
  }

  protected _getShowValueCancelButton(): boolean {
    return this.alertOptions.showCancelButton ?? false;
  }


}
