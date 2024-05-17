import { inject } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export const provideControlContainer = () => {
  return {
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true }),
  }
};

export abstract class BaseCustomComponent {
  protected container = inject(ControlContainer);

  get controlOf() {
    return this.container.control as FormGroup;
  }

  control = new FormControl('', [Validators.required]);

  validateWithProp(prop: string): boolean {
    if (this.control.errors == null) return false;
    if (!this.control.touched || !this.control.dirty) {
      return false;
    }

    return this.control.errors[prop] != null;
  }
}


export class CustomFormGroup extends FormGroup {
  override markAllAsTouched(): void {
    Object.getOwnPropertyNames(this.controls).forEach((name: string) => {
      this.controls[name].markAllAsTouched();
      this.controls[name].markAsDirty();

    });

    return;
  }

  override markAsUntouched(): void {
    Object.getOwnPropertyNames(this.controls).forEach((name: string) => {
      this.controls[name].markAsUntouched();
      this.controls[name].reset();

    });

    return;
  }
}