import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

import { InputComponent } from "../input.component";
import { InputErrorMessageComponent } from '../input-error-message.component';

import { BaseCustomComponent, provideControlContainer } from "./base";

import { IconComponent } from "@/components/icon.component";



@Component({
    selector: 'app-custom-input',
    template: `
    <div class="flex w-full">
    <ng-content select="[slot=start]"/>
     <app-input
     [class]="class"
     [formControl]="control" [placeholder]="placeholder">
        <!-- <app-icon [icon]="icon" class="text-color" color="" size="20px" strokeWidth="2rem" /> -->

        @if(validateWithProp('required')) {
            <app-input-error-message>
                {{requiredMessage}}
            </app-input-error-message>
        }

          @if(validateWithProp('pattern')) {
            <app-input-error-message>
                {{patternMessage}}
            </app-input-error-message>
        }

     </app-input>
     </div>
    `,
    standalone: true,
    viewProviders: [provideControlContainer()],
    styles: `
    :host{
        display: contents;
    }
    `,
    imports: [
        ReactiveFormsModule,
        InputErrorMessageComponent,
        InputComponent,
        IconComponent
    ]
})
export class CustomInputComponent extends BaseCustomComponent implements OnInit, OnDestroy {
    @Input({ required: true, alias: 'controlKey', }) _key!: string;
    @Input({ required: true }) placeholder!: string;
    @Input() class: string = '';
    @Input() requiredMessage: string = 'Este campo es requerido.';
    @Input() pattern?: RegExp;
    @Input() patternMessage: string = 'El campo es inválido.';
    @Input() icon?: string;
    @Input() required = true;

    override  control = new FormControl('', [Validators.required])

    ngOnInit(): void {
        this.controlOf?.addControl(this._key, this.control);

        if (!this.required) {
            this.control.removeValidators(Validators.required);
        }

        if (this.pattern) {
            this.control.addValidators(Validators.pattern(this.pattern))
        }


    }

    ngOnDestroy(): void {
        this.controlOf?.removeControl(this._key);
    }



}