import {Injectable} from '@angular/core';
import {StatusTrigger} from '../status.trigger';
import {IGame} from '../../classes/game';
import {IPlayer} from '../../classes/player';

@Injectable({
    providedIn: 'root'
})
export class ReadyGameStatusTrigger extends StatusTrigger {
    async after(game: IGame): Promise<any> {
        await this.sendInvites(game);
        console.log('sent invites');
        return this.router.navigate(['lobby','game', game.id]);
    }

    async before(game: IGame): Promise<any> {
        console.log('before...');
        const {players, position} = await this.createPlayers(game.owner, game.seats - game.bots - 1);
        const bots = await this.createBots(game.bots, position);
        game.players = game.players.concat([...bots, ...players]);
        console.log(players, bots);
        return this.generateGame(game);
    }

    async sendInvites(game: IGame): Promise<void> {
        await Promise.all(game.invitees.map(async invitee => await this.notificationService.sendInvite(game, invitee.profile)));
    }

    async createBots(count: number, position): Promise<IPlayer[]> {
        const bots = new Array(count);
        return [...bots].map((bot, index) => {
            const player: IPlayer = {
                created: new Date(), name: `Bot ${index + 1}`, owner: false, position: ++position
            };
            return player;
        });
    }

    async createPlayers(uid: string, count: number): Promise<{players: IPlayer[], position: number}> {
        let position = 0;
        const owner = await this.profileService.profile();
        const players = new Array(count);
        const ownerPlayer: IPlayer = { created: new Date(), name: owner.displayName, owner: true, position };
        const createdPlayers = [ownerPlayer, ...[...players].map((player, index) => {
            const additionalPlayer: IPlayer = {
                created: new Date(), name: `Player ${index + 1}`, owner: false, position: ++position,
            };
            return additionalPlayer;
        })];
        console.log(players, createdPlayers);
        return {players: createdPlayers, position};
    }

    async generateGame(game: IGame): Promise<IGame> {
        console.log(game);
        await this.gameService.create(game);
        return game;
    }

}
