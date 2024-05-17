import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";



@Component({
    selector: 'app-form-container',
    template: `
    <div [class]="'flex flex-col gap-y-3 w-full h-auto justify-center items-center ' + cssClass"
    >
        <ng-content  />
    </div>
    `,
    standalone: true,
    imports: [NgClass],
})
export class FormContainerComponent {
    @Input('class') cssClass = '';
}