import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { authInterceptor } from './services/auth.interceptor';

import { reducers } from './store/reducers';

import { CounterEffects } from './store/effects/counter.effects';
import { PostsEffects } from './store/effects/posts.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),
    // provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-b1tmymqymzxizcji.us.auth0.com',
      clientId: '3twCuwer4HTGm4lMz6nCGVV0g1dZTBGA',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    provideStore(reducers),
    provideEffects(CounterEffects, PostsEffects),
    importProvidersFrom(StoreDevtoolsModule.instrument({ maxAge: 25 }))
  ]
};
