import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {GameService} from '../services/game/game.service';
import {ProfileService} from '../services/profile/profile.service';

@Injectable({
    providedIn: 'root',
})
export class GameGuard implements CanActivate {
    constructor(private profileService: ProfileService, private gameService: GameService, private router: Router) {

    }


    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> {
        try {
            const profile = await this.profileService.profile()
            const game = await this.gameService.game(next.params.game);
            if (game.public) { // If game is public
                if (game.seats - game.players.length) { // If game has open seats
                    return true;
                }
            }
            if (game.owner === profile.uid) { // If owner
                return true;
            }
            if (game.players.some(player => player.profileId === profile.uid)) { // If current player
                return true;
            }
            if (profile.friends.some(friend => friend === game.owner)) { // If friend
                return true;
            }
            if (game.viewable && next.params.action === 'watch') { // If game is watchable
                return true;
            }
            this.router.navigate(['/lobby']);
        } catch (error) {
            // Catch case in which authentication for user is no longer valid despite having a user account stored locally.
            this.router.navigate(['/lobby']);
        }
    }
}
