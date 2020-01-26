import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LobbyComponent} from './pages/lobby/lobby.component';
import {GameComponent} from './pages/game/game.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {GameListComponent} from './pages/game-list/game-list.component';
import {GameRulesComponent} from './pages/game-rules/game-rules.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {AboutComponent} from './pages/about/about.component';


const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'lobby', component: LobbyComponent,
    children: [
      { path: '', component: GameListComponent },
      { path: 'rules', component: GameRulesComponent },
      { path: 'game/:game', component: GameComponent },
    ] },
  { path: 'welcome', component: WelcomeComponent,
    children: [
      { path: '', redirectTo: '/welcome/signup', pathMatch: 'full' },
      { path: 'signup', component: RegistrationComponent, data: { auth: 'signup'} },
      { path: 'login', component: RegistrationComponent, data: { auth: 'login'} },
      { path: 'about', component: AboutComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
