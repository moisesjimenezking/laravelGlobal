
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';

@Component({
    standalone: true,
    selector: 'app-icon',
    imports: [NgIconComponent],
    template: `<ng-icon [class]="cssClass" [size]="size" [strokeWidth]="strokeWidth" [color]="color"  [svg]="icon" />`,
    styles: `
    :host {
        display: contents;
    }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnInit {
    @Input({ required: true }) icon!: any;
    @Input() size: string = '20px';
    @Input() color: string = 'var(--color-white)';
    @Input() strokeWidth: string | number = '1.5rem';
    @Input('class') cssClass: string = '';


    ngOnInit(): void {

        this.cssClass = `${this.cssClass} min-w-[${this.size}]`
    }
}