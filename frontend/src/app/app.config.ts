import { ApplicationConfig, inject } from '@angular/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';


import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideNgIconLoader, provideNgIconsConfig, withCaching } from '@ng-icons/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(
    withFetch(),
  ),
  provideNgIconsConfig({
    size: '20px',
    color: 'var(--color-text)'
  }),
  provideNgIconLoader(name => {
    const http = inject(HttpClient);

    return http.get(`/assets/icons/${name}.svg`, { responseType: 'text' });
  }, withCaching()),
  provideAnimations(),
  ],

};