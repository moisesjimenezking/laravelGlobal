import { HttpProvider } from '@/global/http.const';
import { APIQueryEmployee, APIResponceMutateEmployee, APIResponseModel } from '@/models/api_response.model';
import { CreateEmployeeMutationModel, EmployeeModel, UpdateEmployeeMutationModel } from '@/models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }


  getEmployees(q: APIQueryEmployee = { page: 1 }): Observable<APIResponseModel<EmployeeModel[]>> {

    return this._httpClient.get<APIResponseModel<EmployeeModel[]>>(
      `${HttpProvider.apiUri}`
      , {
        params: { ...q } as Record<string, boolean | number | string>
      });
  }

  createEmployee(params: CreateEmployeeMutationModel): Observable<APIResponceMutateEmployee> {

    return this._httpClient.post<APIResponceMutateEmployee>(
      `${HttpProvider.apiUri}register`
      , params);
  }

  updateEmployee(id: number, params: Omit<UpdateEmployeeMutationModel, 'id'>): Observable<APIResponceMutateEmployee> {

    return this._httpClient.put<APIResponceMutateEmployee>(
      `${HttpProvider.apiUri}users`
      , { id, ...params });
  }



  deleteEmployee(id: number): Observable<any> {

    return this._httpClient.delete<any>(
      `${HttpProvider.apiUri}users`
      , { body: { id } });
  }
}
