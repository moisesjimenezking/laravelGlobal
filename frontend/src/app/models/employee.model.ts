
export interface EmployeeModel {
    id: number;
    firstName: string;
    otherName: string;
    surname: string;
    secondSurname: string;
    email: string;
    identificationType: string;
    identificationNumber: string;
    country: string;
    area: string;
    state: string;
    admissionDate: Date | string;
    created_at: Date | string;
    updated_at: Date | string;
}


export interface EmployeeMutationModel {
    id: number;
    firstName: string;
    otherName?: string;
    surname: string;
    secondSurname: string;
    identificationType: string;
    identificationNumber: string;
    country: string;
    area: string;
    admissionDate: Date | string;
}

export type CreateEmployeeMutationModel = Omit<EmployeeMutationModel, 'id'>;
export type UpdateEmployeeMutationModel = Partial<EmployeeModel>;

