
import { NgClass } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';



@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
    @Input() id = `__input__${this._getRamdonId()}`
    @Input() label?: string;
    @Input() type: string = 'text';
    @Input() placeholder: string = '';
    @Input() required: boolean = false;
    @Input() autocomplete = 'on';
    @Input() readonly = false;
    @Input('class') cssClass = '';
    @Input('errormessageclass') errorMessageClass = '';
    @Input() style: any;
    @Input() min: string = '';
    @Input() max: string = '';

    private touchedCb!: () => void;
    private changeCb!: (...args: any[]) => void;

    innerValue: any;



    ngOnInit(): void {
    }

    writeValue(obj: any): void {
        this.innerValue = obj;
    }

    registerOnChange(fn: any): void {
        this.changeCb = fn;
    }

    registerOnTouched(fn: any): void {
        this.touchedCb = fn;
    }

    onBlur() {
        this.touchedCb();
    }

    onCurrencyChange(ev?: number) {

        let value = ev;

        if (value == null) {
            this.changeCb('');
            return;
        }

        if (value <= 0) {
            this.changeCb('');
            return;
        }


        this.changeCb(value?.toString().replace('.', ','));
    }

    onChange(ev: any) {
        const value = ev.target.value;
        this.changeCb(value);
    }

    private _getRamdonId() {
        const values = 'a e i o u 1 2 3 4 5 6 7 8 9 0';
        const valuesSp = values.split(' ');
        const l = valuesSp.length - 1;

        let id = '';

        for (let i = 0; i <= 12; i++) {
            const r = Math.round(Math.random() * l);
            id += valuesSp[r];
        }


        return id;

    }

}