import { DOCUMENT } from '@angular/common';

import {
    ComponentRef,
    Inject,
    Injectable,
    Injector,
    ViewContainerRef,
} from '@angular/core';


import { ModalComponent } from './components/modal/modal.component';
import { ModalOptions } from './modal';
import { FadeAnimation } from '../animations';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private viewContainerRef!: ViewContainerRef;

    private readonly _fadeAnimation = new FadeAnimation();
    private modalComponent: ComponentRef<ModalComponent> | null = null;

    constructor(
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document
    ) { }

    async open({ component, enterAnimation, leaveAnimation, componentProps, dismissBackdrop }: ModalOptions) {
        this.viewContainerRef.clear();

        this.modalComponent = this.viewContainerRef.createComponent(
            ModalComponent,
            {
                injector: this.injector,
            },
        );

        const ref = this.modalComponent.instance.viewContainerRef.createComponent(component, {
            injector: this.injector
        });

        if (componentProps) {
            Object.getOwnPropertyNames(componentProps).forEach(name => {
                ref.instance[name] = componentProps[name]
            })
        }

        this.document.body.appendChild(this.modalComponent.location.nativeElement);

        const modalHTMLElement =
            this.modalComponent.location.nativeElement.querySelector('.modal');

        const modalFirstChildElement =
            modalHTMLElement.querySelector('.modal__container');

        const clickOutside = (ev: Event) => {
            const target = ev.target as HTMLElement;
            if (
                target != modalFirstChildElement &&
                !modalFirstChildElement.contains(target)
            ) {

                modalHTMLElement?.removeEventListener('click', clickOutside);
                ref.instance['modalRef'].dismiss();
            }
        };

        if (dismissBackdrop ?? false) {
            modalHTMLElement?.addEventListener('click', clickOutside);
        }

        return await new Promise<{ reason: string; data?: any }>(resolve => {

            ref.instance['modalRef'] = {
                dismiss: (reason: string, data?: any) => {
                    const el = this.modalComponent!.location.nativeElement
                        .querySelector('.modal__container')
                    // const pl = this._fadeAnimation.fadeAnimationLeave(el);

                    // pl.play();

                    // pl.onDone(() => {

                    this.closeModal(this.modalComponent!)
                    resolve({ reason, data });
                    // })
                }
            }

            this.modalComponent!.instance.ref = ref.instance['modalRef'];
        })
    }

    private closeModal(component: ComponentRef<ModalComponent>) {

        if (this.document.body.contains(component.location.nativeElement)) {
            this.document.body.removeChild(component.location.nativeElement);
        }
        component.destroy();
        this.viewContainerRef.clear();
    }

    dismissAll() {
        if (this.modalComponent == null) return;

        this.closeModal(this.modalComponent);
    }

    init(config: {
        viewContainerRef: ViewContainerRef
    }) {


        this.viewContainerRef = config.viewContainerRef
    }

}