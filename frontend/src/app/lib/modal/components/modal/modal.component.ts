import {
    AfterContentInit,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ModalBase } from '../../modal';

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: true,
    imports: [],

})
export class ModalComponent implements AfterContentInit, OnDestroy {
    @ViewChild('vcr', { read: ViewContainerRef, static: true })
    viewContainerRef!: ViewContainerRef;

    @Input() ref!: ModalBase;

    constructor(private readonly elementRef: ElementRef) {
    }

    ngAfterContentInit(): void {
    }

    ngOnDestroy(): void {

    }

    close(): void {
        this.ref?.modalRef?.dismiss('close', null);
    }


}