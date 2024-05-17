import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { CustomFormGroup } from '@/components/form/input/customs/base';
import { FormContainerComponent } from "@/components/form/form-container/form-container.component";
import { CustomInputComponent } from "@/components/form/input/customs/custom-input.component";
import { ModalBase, ModalRef } from '@/lib/modal/modal';
import { ButtonComponent } from "@/components/button/button.component";
import { PATTERNS } from '@/global/patterns.const';
import { DatetimeInputComponent } from "../form/input/customs/datetime-input.component";
import { EmployeeService } from '@/services/employee.service';
import { AlertService } from '@/lib';
import { httpErrorMessageDefault } from '@/global/http.const';
import { CreateEmployeeMutationModel, EmployeeModel, UpdateEmployeeMutationModel } from '@/models/employee.model';

@Component({
  selector: 'app-create-employee-modal',
  standalone: true,
  templateUrl: './create-employee-modal.component.html',
  styleUrl: './create-employee-modal.component.scss',
  imports: [
    ReactiveFormsModule,
    FormContainerComponent,
    CustomInputComponent,
    ButtonComponent,
    DatetimeInputComponent
  ]
})
export class CreateEmployeeModalComponent extends ModalBase implements OnInit, AfterViewInit {

  @Input() override modalRef!: ModalRef;

  @Input() employee?: EmployeeModel;
  @Input() isEditting = false;


  // formulario
  form = new CustomFormGroup({});
  dniType = '';
  country = '';
  area = '';


  // patterns
  namePattern = PATTERNS.NAME;
  namePatternExtend = PATTERNS.NAME_EXTEND;
  dniPattern = PATTERNS.DNI;

  minDate = '';

  isSubmitting = false;

  private readonly employeeService = inject(EmployeeService);
  private readonly alertService = inject(AlertService);


  ngOnInit(): void {
    const d = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('.')[0].split(':');
    this.minDate = `${d[0]}:${d[1]}`;

  }

  ngAfterViewInit(): void {

    if (this.isEditting) {

      const { firstName, otherName, surname, secondSurname, dni, datetime } = this.form.controls;

      firstName.setValue(this.employee!.firstName);
      surname.setValue(this.employee!.surname);
      secondSurname.setValue(this.employee!.secondSurname);
      dni.setValue(this.employee!.identificationNumber);
      datetime.setValue(this.employee!.admissionDate);
      otherName.setValue(this.employee!.otherName);
      this.country = this.employee!.country;
      this.dniType = this.employee!.identificationType;
      this.area = this.employee!.area;

    }
  }

  onSelectDniType(ev: any) {
    this.dniType = ev.target.value;
  }

  onSelectCountry(ev: any) {
    this.country = ev.target.value;
  }

  onSelectArea(ev: any) {
    this.area = ev.target.value;
  }

  onCancel() {
    this.modalRef.dismiss('cancel');
  }

  onHandleAction() {
    this.form.markAllAsTouched();

    if (this.form.invalid || this.dniType == '' || this.country == '' || this.area == '') {
      return;
    }

    if (!this.isEditting) {
      this.onRegisterEmployee();
      return;
    }

    this.onEditEmployee();

  }

  onRegisterEmployee() {

    const { firstName, otherName, surname, secondSurname, dni, datetime } = this.form.value;

    // const date = datetime.split('T')[0];
    const date = datetime.split('/').reverse().join('-');

    const form: CreateEmployeeMutationModel = {
      firstName,
      surname,
      secondSurname,
      identificationType: this.dniType,
      identificationNumber: dni,
      admissionDate: date,
      country: this.country,
      area: this.area

    };

    if (otherName) {
      form['otherName'] = otherName;
    }

    this.isSubmitting = true;



    this.employeeService.createEmployee(form)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.modalRef.dismiss('success');
          this.form.reset('');

          this.alertService.present({
            title: 'Nuevo empleado',
            body: `El empleado ${response.user.firstName} ${response.user.surname} ha sido registrado exitosamente.`,
            showCancelButton: false,
            textConfirmButton: 'Aceptar'
          });
        },
        error: (error) => {
          this.alertService.present({
            title: 'Error',
            body: httpErrorMessageDefault,
            showCancelButton: false,
            textConfirmButton: 'Aceptar'
          });
          this.isSubmitting = false;
        }
      })

  }

  onEditEmployee() {
    const { firstName, otherName, surname, secondSurname, dni, datetime } = this.form.value;

    // const date = datetime.split('T')[0];
    const date = datetime.split('/').reverse().join('-');
    console.log(date);

    const form: Omit<UpdateEmployeeMutationModel, 'id'> = {
      firstName,
      surname,
      secondSurname,
      identificationType: this.dniType,
      identificationNumber: dni,
      admissionDate: date,
      country: this.country,
      area: this.area

    };

    if (otherName) {
      form['otherName'] = otherName;
    }

    this.isSubmitting = true;

    // updating employee

    this.employeeService.updateEmployee(this.employee!.id, form)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.modalRef.dismiss('success');
          this.form.reset('');

          this.alertService.present({
            title: 'Edición de empleado',
            body: `El empleado ${response.user.firstName} ${response.user.surname} ha sido editado exitosamente.`,
            showCancelButton: false,
            textConfirmButton: 'Aceptar'
          });
        },
        error: (error) => {
          this.alertService.present({
            title: 'Error',
            body: httpErrorMessageDefault,
            showCancelButton: false,
            textConfirmButton: 'Aceptar'
          });
          this.isSubmitting = false;
        }
      })

  }

}
