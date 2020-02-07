import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {PlayerService} from '../services/player/player.service';
import {IProfileReadOnly} from '../classes/profile';

@Injectable({ providedIn: 'root' })
export class PlayerResolver implements Resolve<IProfileReadOnly> {
    constructor(private service: PlayerService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params.player;
        return await this.service.player(id);
    }
}

