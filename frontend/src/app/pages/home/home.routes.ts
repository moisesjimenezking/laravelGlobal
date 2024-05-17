import { Route } from "@angular/router";


export class HomeRoutes {

    static path = '';

    static get route(): Route {
        return {
            title: 'Home | Global Tecnologías Academy',
            path: this.path,
            loadComponent: () => import('./home.component').then(c => c.HomeComponent),
        }
    }
}