import { Component, OnInit, inject } from '@angular/core';
import { httpErrorMessageDefault } from '@/global/http.const';

import { AlertService, ModalService } from '@/lib';

import { EmployeeModel, EmployeeMutationModel } from '@/models/employee.model';
import { EmployeeComponent } from '@/components/employee/employee.component';
import { ButtonComponent } from '@/components/button/button.component';
import { EmployeeService } from '@/services/employee.service';
import { CreateEmployeeModalComponent } from '@/components/create-employee-modal/create-employee-modal.component';
import { PaginationComponent } from "@/components/pagination/pagination.component";
import { FiltersComponent } from "@/components/filters/filters.component";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  imports: [
    ButtonComponent,
    EmployeeComponent,
    PaginationComponent,
    FiltersComponent
  ]
})
export class EmployeeListComponent implements OnInit {

  employees: EmployeeModel[] = [];

  isLoading = false;

  page = 1;
  limit = 10;

  private readonly employeeService = inject(EmployeeService);
  private readonly modalService = inject(ModalService);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
    this.getEmployees();
  }


  getEmployees(query: Partial<EmployeeMutationModel> = {}) {
    this.isLoading = true;

    this.employeeService.getEmployees({
      page: this.page,
      limit: this.limit,
      ...query
    })
      .subscribe({
        next: (response) => {
          this.employees = response.data;
          console.log(response);
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        }
      })
  }

  onSearchEmployee(query: Partial<EmployeeMutationModel> | null) {
    if (query == null) {
      this.getEmployees();
      return;
    }
    if (Object.getOwnPropertyNames(query).length == 0) {
      this.getEmployees();
      return;
    }

    this.getEmployees(query);
  }

  async onRegisterEmployee() {
    const { reason, data } = await this.modalService.open({
      component: CreateEmployeeModalComponent,
    });

    if (reason == 'success') {
      this.getEmployees();
    }

  }

  async onEditEmployee(employee: EmployeeModel) {
    const { reason } = await this.modalService.open({
      component: CreateEmployeeModalComponent,
      componentProps: {
        isEditting: true,
        employee
      }
    });

    if (reason == 'success') {
      this.getEmployees();
    }
  }

  onDeleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe({
        next: (response) => {
          this.alertService.present({
            title: 'Exito',
            body: 'El empleado ha sido eliminado exitosamente',
            showCancelButton: false,
            textConfirmButton: 'Cerrar'
          });

          this.getEmployees();

        },
        error: (error) => {
          this.alertService.present({
            title: 'Error',
            body: httpErrorMessageDefault,
            showCancelButton: false,
            textConfirmButton: 'Aceptar'
          });
        }
      })
  }
}
