import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"first-project-91685","appId":"1:80600432558:web:9345f3a198ce2ea948d23f","storageBucket":"first-project-91685.firebasestorage.app","apiKey":"AIzaSyC8q0ZIZhIRMLM5Cwk7mab83aUgBhkIM88","authDomain":"first-project-91685.firebaseapp.com","messagingSenderId":"80600432558","measurementId":"G-Y294CGF7FY"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())]
};
