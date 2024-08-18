import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importar los componentes que hemos creado
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { EventListComponent } from './event-list/event-list.component';
import { CreateEventComponent } from './create-event/create-event.component';

// Importar los servicios
import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';

// Configuración de Firebase (reemplaza con tus propias credenciales)
const firebaseConfig = {
  apiKey: 'AIzaSyBHOicxqGG_Xw0FNFWud3ZC-kTnPdgnUoA',
  authDomain: 'event-manager-f101b.firebaseapp.com',
  projectId: 'event-manager-f101b',
  storageBucket: 'event-manager-f101b.appspot.com',
  messagingSenderId: '488484312889',
  appId: '1:488484312889:web:9a77ed88c5d74bbffcfae8',
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EventListComponent,
    CreateEventComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    EventService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
