import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

import { InputComponent } from "../input.component";
import { InputErrorMessageComponent } from '../input-error-message.component';

import { BaseCustomComponent, provideControlContainer } from "./base";

import { IconComponent } from "@/components/icon.component";



@Component({
    selector: 'app-datetime-input',
    template: `
    <div class="flex w-full">
    <ng-content select="[slot=start]"/>
     <app-input
     type="date"
     [min]="min"
     [max]="maxDate"
     [formControl]="control" [placeholder]="placeholder"
     >
 
        @if(validateWithProp('required')) {
            <app-input-error-message>
                {{requiredErrorMessage}}
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
export class DatetimeInputComponent extends BaseCustomComponent implements OnInit, OnDestroy {
    @Input({ required: true, alias: 'controlKey', }) _key!: string;
    @Input() min: string = '';
    @Input({ required: true }) placeholder!: string;
    @Input() requiredErrorMessage = '';

    override  control = new FormControl('', [Validators.required]);

    maxDate = '';

    ngOnInit(): void {
        const d = new Date().toISOString().split('.')[0].split(':');
        this.maxDate = `${d[0]}:${d[1]}`;
        this.controlOf?.addControl(this._key, this.control);
    }

    ngOnDestroy(): void {
        this.controlOf?.removeControl(this._key);
    }



}