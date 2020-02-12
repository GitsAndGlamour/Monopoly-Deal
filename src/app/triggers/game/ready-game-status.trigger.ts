import {Injectable} from '@angular/core';
import {StatusTrigger} from '../status.trigger';
import {IGame} from '../../classes/game';
import {IPlayer} from '../../classes/player';
import {ChatLevel, IChat} from '../../classes/message';

@Injectable({
    providedIn: 'root'
})
export class ReadyGameStatusTrigger extends StatusTrigger {
    async after(game: IGame): Promise<any> {
        await this.sendInvites(game);
        console.log('sent invites');
        return this.router.navigate(['lobby','game', game.id], { queryParams: { action: 'play' }});
    }

    async before(game: IGame): Promise<any> {
        console.log('before...');
        const {players, position} = await this.createPlayers(game.owner, game.seats - game.bots - 1);
        const bots = await this.createBots(game.bots, position);
        game.players = game.players.concat([...bots, ...players]);
        console.log(players, bots);
        await this.generateGame(game);
        await this.createChat(game);
        return game;
    }

    async sendInvites(game: IGame): Promise<void> {
        await Promise.all(game.invites.map(async invite => {
            await this.inviteService.sendGameInvite(invite);
            await this.notificationService.sendGameInviteNotification(invite);
        }));
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
        const ownerPlayer: IPlayer = { created: new Date(), name: owner.displayName, owner: true, position, profile: owner, profileId: owner.uid };
        const createdPlayers = [ownerPlayer, ...[...players].map((player, index) => {
            const additionalPlayer: IPlayer = {
                created: new Date(), name: `Player ${index + 1}`, owner: false, position: ++position,
            };
            return additionalPlayer;
        })];
        return {players: createdPlayers, position};
    }

    async createChat(game: IGame) {
        const id = await this.chatService.id();
        const chat: IChat = { game, id, level: ChatLevel.GAME, messages: [], owner: game.owner, participants: [] };
        await this.chatService.create(chat);
    }

    async generateGame(game: IGame): Promise<void> {
        await this.gameService.create(game);
    }

}
