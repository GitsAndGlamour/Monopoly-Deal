import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {RouterModule} from '@angular/router';
import {AppRoutingModule, routes} from '../app-routing.module';
import {LobbyComponent} from './lobby/lobby.component';
import {GameRulesComponent} from './game-rules/game-rules.component';
import {AppComponent} from '../app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {GameComponent} from './game/game.component';
import {CreateGameComponent} from './game-list/create-game/create-game.component';
import {RegistrationComponent} from './registration/registration.component';
import {AboutComponent} from './about/about.component';
import {ProfileComponent} from './profile/profile.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {GameListComponent} from './game-list/game-list.component';
import {DeckComponent} from '../components/game/deck/deck/deck.component';
import { AddFriendComponent } from './profile/add-friend/add-friend.component';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        LobbyComponent,
        GameComponent,
        GameListComponent,
        CreateGameComponent,
        GameRulesComponent,
        RegistrationComponent,
        AboutComponent,
        ProfileComponent,
        DeckComponent,
        CreateGameComponent,
        AddFriendComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatExpansionModule
    ],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesSpecModule { }
