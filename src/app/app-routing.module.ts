import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LobbyComponent} from './pages/lobby/lobby.component';
import {GameComponent} from './pages/game/game.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {GameListComponent} from './pages/game-list/game-list.component';
import {GameRulesComponent} from './pages/game-rules/game-rules.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {AboutComponent} from './pages/about/about.component';
import {AuthGuard} from './guards/auth.guard';
import {WelcomeGuard} from './guards/welcome.guard';
import {FriendListResolver, GameListResolver, OnlineListResolver} from './pages/game-list/game-list.resolver';
import {GameResolver} from './pages/game/game.resolver';
import {ProfileResolver} from './pages/lobby/lobby.resolver';
import {ProfileComponent} from './pages/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/welcome/signup', pathMatch: 'full' },
  { path: 'lobby', component: LobbyComponent, canActivate: [AuthGuard], resolve: { profile: ProfileResolver },
    children: [
      { path: '', component: GameListComponent, resolve: { games: GameListResolver, friends: FriendListResolver, online: OnlineListResolver } },
      { path: 'rules', component: GameRulesComponent },
      { path: 'game/:game', component: GameComponent, resolve: { game: GameResolver } },
      { path: 'about', component: AboutComponent },
      { path: 'profile', component: ProfileComponent },

    ] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [WelcomeGuard],
    children: [
      { path: '', redirectTo: '/welcome/signup', pathMatch: 'full' },
      { path: 'signup', component: RegistrationComponent, data: { tab: 0} },
      { path: 'login', component: RegistrationComponent, data: { tab: 1} },
      { path: 'about', component: AboutComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
