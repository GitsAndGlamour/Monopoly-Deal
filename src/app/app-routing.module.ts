import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LobbyComponent} from './pages/lobby/lobby.component';
import {GameComponent} from './pages/game/game.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {GameListComponent} from './pages/game-list/game-list.component';
import {GameRulesComponent} from './pages/game-rules/game-rules.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {AboutComponent} from './pages/about/about.component';
import {AuthGuard} from './guards/auth.guard';
import {WelcomeGuard} from './guards/welcome.guard';
import {ProfileComponent} from './pages/profile/profile.component';
import {
  FriendListResolver,
  OnlineListResolver,
  ProfileListResolver,
  ProfileResolver
} from './resolvers/profile.resolver';
import {GameListResolver, GameResolver, PlayerGameListResolver} from './resolvers/game.resolver';
import {InviteListResolver} from './resolvers/invite.resolver';
import {PlayerComponent} from './pages/player/player.component';
import {PlayerResolver} from './resolvers/player.resolver';
import {GameGuard} from './guards/game.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/welcome/signup', pathMatch: 'full' },
  { path: 'lobby', component: LobbyComponent, canActivate: [AuthGuard], resolve: { profile: ProfileResolver, profiles: ProfileListResolver, friends: FriendListResolver },
    children: [
      { path: '', component: GameListComponent, resolve: { games: GameListResolver, friends: FriendListResolver, online: OnlineListResolver } },
      { path: 'rules', component: GameRulesComponent },
      { path: 'game/:game', component: GameComponent, resolve: { game: GameResolver }, canActivate: [GameGuard] },
      { path: 'about', component: AboutComponent },
      { path: 'profile', component: ProfileComponent, resolve: { invites: InviteListResolver } },
      { path: 'player/:player', component: PlayerComponent, outlet: 'popup', resolve: { player: PlayerResolver, games: PlayerGameListResolver, invites: InviteListResolver } },
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
