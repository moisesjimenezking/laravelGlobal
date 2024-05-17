import { Routes } from '@angular/router';

// ROUTES //
import { HomeRoutes } from './pages/home/home.routes';

export const routes: Routes = [
    HomeRoutes.route,
    {
        path: '**',
        redirectTo: HomeRoutes.path,
        pathMatch: 'full'
    }
];
