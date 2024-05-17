
import { AnimationMetadata } from "@angular/animations";
import { Type } from "@angular/core";


export interface ModalOptions {
    component: Type<any>;
    componentProps?: { [prop: string]: any };
    enterAnimation?: AnimationMetadata | AnimationMetadata[];
    leaveAnimation?: AnimationMetadata | AnimationMetadata[];
    dismissBackdrop?: boolean;
}

export interface ModalRef {
    dismiss: (reason: string, data?: any) => void;
}


export abstract class ModalBase {
    abstract modalRef: ModalRef;
}