import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {IGame} from '../classes/game';
import {GameService} from '../services/game/game.service';
import {ChatService} from '../services/chat/chat.service';
import {IChat} from '../classes/message';

@Injectable({ providedIn: 'root' })
export class GameResolver implements Resolve<IGame> {
    constructor(private service: GameService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params.game;
        return await this.service.game(id);
    }
}

@Injectable({ providedIn: 'root' })
export class GameChatResolver implements Resolve<IChat> {
    constructor(private service: ChatService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params.game;
        return await this.service.chat(id);
    }
}

@Injectable({ providedIn: 'root' })
export class GameListResolver implements Resolve<IGame[]> {
    constructor(private service: GameService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return await this.service.games();
    }
}

@Injectable({ providedIn: 'root' })
export class PlayerGameListResolver implements Resolve<IGame[]> {
    constructor(private service: GameService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params.player;
        return await this.service.gamesByProfile(id);
    }
}

