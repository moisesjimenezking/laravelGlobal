import { ComponentRef, Inject, Injectable, Injector, ViewContainerRef, } from "@angular/core";
import { DOCUMENT } from "@angular/common";

import { AlertComponent, AlertOptions, AlertRole } from "./components/alert/alert.component";

import { FadeAnimation } from "@/lib/animations";

export interface AlertPresented {
    dismiss: () => void;
}

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    private viewContainerRef!: ViewContainerRef;

    private _alert!: ComponentRef<AlertComponent>;
    private readonly _fadeAnimation = new FadeAnimation();


    private _isAlertPresenting = false;

    constructor(
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document) { }

    async present(options: AlertOptions) {
        if (this._isAlertPresenting) {
            return { role: AlertRole.cancelled };
        };
        this._isAlertPresenting = true;

        this._alert = this.viewContainerRef.createComponent(
            AlertComponent,
            {
                injector: this.injector,
            },
        );

        this._alert.instance.alertOptions = options;

        const el = this._alert.location.nativeElement
            ?.querySelector('#alert__content')

        const enterAnimation = this._fadeAnimation.fadeAnimation(el);

        enterAnimation.play();

        this.document.body.appendChild(this._alert.location.nativeElement);



        return new Promise<{ role: AlertRole }>(resolve => {
            this._alert.instance.dismiss = (role: AlertRole) => {
                this.dismiss()
                resolve({ role });
            }
        })
    }

    dismiss() {
        const el = this._alert.location.nativeElement
            ?.querySelector('#alert__content')
        const leaveAnimation = this._fadeAnimation.fadeAnimationLeave(el);

        leaveAnimation.play()
        leaveAnimation.onDone(() => {
            if (this.document.body.contains(this._alert.location.nativeElement)) {
                this.document.body.removeChild(this._alert.location.nativeElement);
            }
            this._isAlertPresenting = false;
            this._alert.destroy()
        })

    }


    init(config: {
        viewContainerRef: ViewContainerRef
    }) {

        this.viewContainerRef = config.viewContainerRef
    }
}