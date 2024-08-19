import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importar componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { EventListComponent } from './event-list/event-list.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { SettingsComponent } from './settings/settings.component';

// Importar servicios
import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';

// Importar módulos de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CompletedEventsComponent } from './completed-events/completed-events.component';

// Configuración de Firebase
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
    EventDetailsComponent,
    SettingsComponent,
    CompletedEventsComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    EventService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
