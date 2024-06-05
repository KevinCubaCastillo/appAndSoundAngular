import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import {provideStorage, getStorage} from '@angular/fire/storage'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(), importProvidersFrom([
    provideFirebaseApp(()=> initializeApp({
      apiKey: "AIzaSyB2S73Hzoe9-RTP7lUcSAkC1kcw0yggUCo",
      authDomain: "storage-d2d10.firebaseapp.com",
      projectId: "storage-d2d10",
      storageBucket: "storage-d2d10.appspot.com",
      messagingSenderId: "432584108524",
      appId: "1:432584108524:web:1d72d629352993f0e538c9"
    })
    ),
    provideStorage( () => getStorage() )
  ])
]
};
