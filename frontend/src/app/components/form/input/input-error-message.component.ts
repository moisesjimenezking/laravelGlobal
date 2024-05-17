import { Component } from "@angular/core";


@Component({
    selector: 'app-input-error-message',
    template: `
    <span 
    class="px-2 animate-fade-in-down animate-duration-400 animate__fast text-red-500 text-sm font-light mt-2 mb-1 text-left float-left">
        <ng-content />
    </span>
    `,
    standalone: true,

})
export class InputErrorMessageComponent { }