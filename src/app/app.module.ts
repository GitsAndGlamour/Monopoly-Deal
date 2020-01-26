import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {LobbyComponent} from './pages/lobby/lobby.component';
import {GameComponent} from './pages/game/game.component';
import {GameListComponent} from './pages/game-list/game-list.component';
import {GameRulesComponent} from './pages/game-rules/game-rules.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {AboutComponent} from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LobbyComponent,
    GameComponent,
    GameListComponent,
    GameRulesComponent,
    RegistrationComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
