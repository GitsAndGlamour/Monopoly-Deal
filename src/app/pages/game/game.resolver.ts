import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Game} from '../../classes/game';
import {GameService} from '../../services/game/game.service';

@Injectable({ providedIn: 'root' })
export class GameResolver implements Resolve<Game> {
    constructor(private service: GameService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params.game;
        return await this.service.game(id);
    }
}
