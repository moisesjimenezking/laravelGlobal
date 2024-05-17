import { AnimationBuilder, AnimationOptions, animate, keyframes, style } from "@angular/animations";
import { inject } from "@angular/core";

export class FadeAnimation {
    private readonly _buildAnimation = inject(AnimationBuilder);

    fadeAnimation(element: any, options?: AnimationOptions | undefined) {
        const animation = this._buildAnimation.build([
            style({ opacity: 0 }),
            animate('340ms ease-out', keyframes([
                style({
                    opacity: .6,
                    transform: 'translate(0, 0) scale(0.985)'
                }),
                style({
                    opacity: .7,
                    transform: 'translate(0, 0) scale(1.25)'
                }),
                style({
                    opacity: 1,
                    transform: 'translate(0, 0) scale(1.1)'
                }),
                style({
                    opacity: 1,
                    transform: 'translate(0, 0) scale(1)'
                }),
                style({
                    opacity: 1,
                    transform: 'translate(0, 0) scale(.85)'
                }),
                style({
                    opacity: 1,
                    transform: 'translate(0, 0) scale(1)'
                })
            ])),
        ]);

        return animation.create(element, options);
    }

    fadeAnimationLeave(element: any, options?: AnimationOptions | undefined) {
        const animation = this._buildAnimation.build([
            style({ opacity: 0 }),
            animate('250ms ease-out', keyframes([
                style({
                    opacity: 1,
                    transform: 'translate(0, 0) scale(1)'
                }),
                style({
                    opacity: .7,
                    transform: 'translate(0, 0) scale(0.9)'
                }),
                style({
                    opacity: .5,
                    transform: 'translate(0, 0) scale(.7)'
                }),
                style({
                    opacity: .2,
                    transform: 'translate(0, 0) scale(.4)'
                }),
                style({
                    opacity: .1,
                    transform: 'translate(0, 0) scale(.1)'
                })
            ])),
        ])

        return animation.create(element, options)
    }

    // fadeAnimationLeave(element: any, options?: AnimationOptions | undefined) {
    //     const animation = this._buildAnimation.build([
    //         style({ opacity: 1 }),
    //         animate('5s ease-in', style({
    //             transform: 'scale(.7)',
    //             background: 'red',
    //             opacity: 0
    //         })),
    //     ]);

    //     return animation.create(element, options)
    // }
}