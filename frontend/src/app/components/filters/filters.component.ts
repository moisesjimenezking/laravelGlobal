import { Component, EventEmitter, Output } from '@angular/core';
import { CustomFormGroup } from '../form/input/customs/base';
import { ReactiveFormsModule } from '@angular/forms';
import { FormContainerComponent } from '../form/form-container/form-container.component';
import { CustomInputComponent } from '../form/input/customs';
import { ButtonComponent } from "@/components/button/button.component";
import { EmployeeMutationModel } from '@/models/employee.model';

@Component({
  selector: 'app-filters',
  standalone: true,
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  imports: [
    ReactiveFormsModule,
    FormContainerComponent,
    CustomInputComponent,
    ButtonComponent
  ]
})
export class FiltersComponent {

  form = new CustomFormGroup({});

  @Output() search = new EventEmitter<Partial<EmployeeMutationModel>>();


  onReset() {
    this.form.reset('');
    this.search.emit();
  }

  onSearch() {
    const { firstName, surname, secondSurname, otherName, dni } = this.form.value;

    const q: Partial<EmployeeMutationModel> = {

    }

    if (firstName) q['firstName'] = firstName;
    if (surname) q['surname'] = surname;
    if (secondSurname) q['secondSurname'] = secondSurname;
    if (otherName) q['otherName'] = otherName;
    if (dni) q['identificationNumber'] = dni;

    this.search.emit(q);
  }



}
