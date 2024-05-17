import { AlertService } from '@/lib';
import { AlertRole } from '@/lib/alert/components/alert/alert.component';
import { EmployeeModel } from '@/models/employee.model';

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent {
  @Input({ required: true }) data!: EmployeeModel;

  @Output() edit = new EventEmitter<EmployeeModel>();
  @Output() delete = new EventEmitter<number>();

  readonly screenWidth = window.screen.availWidth;

  private readonly alertService = inject(AlertService);

  getFullName() {
    const { firstName, surname, secondSurname } = this.data;
    return `${firstName} ${surname} ${secondSurname}`.trim();
  }

  async onDelete() {
    const { role } = await this.alertService.present({
      title: 'Confirmar',
      body: '¿Está seguro de que desea eliminar el empleado?',
      showCancelButton: true,
      textConfirmButton: 'Sí',
      textCancelButton: 'No'
    });

    if (role == AlertRole.cancelled) {
      return;
    }

    this.delete.emit(this.data.id);

  }

  onEdit() {
    this.edit.emit(this.data);
  }
}
