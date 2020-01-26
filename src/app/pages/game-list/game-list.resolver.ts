import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import {Game} from '../../classes/game';
import {User} from 'firebase';
import {GameService} from '../../services/game/game.service';
import {ProfileService} from '../../services/profile/profile.service';
import {Profile} from '../../classes/profile';

@Injectable({ providedIn: 'root' })
export class GameListResolver implements Resolve<Game[]> {
  constructor(private service: GameService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return await this.service.games();
  }
}

@Injectable({ providedIn: 'root' })
export class FriendListResolver implements Resolve<Profile[]> {
  constructor(private service: ProfileService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return await this.service.friends();
  }
}

@Injectable({ providedIn: 'root' })
export class OnlineListResolver implements Resolve<Profile[]> {
  constructor(private service: ProfileService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return await this.service.online();
  }
}
