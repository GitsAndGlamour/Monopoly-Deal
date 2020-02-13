import {Injectable} from '@angular/core';
import {StatusTrigger} from '../status.trigger';
import {IGame, IGameReadOnly} from '../../classes/game';
import {IPlayer} from '../../classes/player';
import {ChatLevel, IChat} from '../../classes/message';
import {IProfileReadOnly} from '../../classes/profile';

@Injectable({
    providedIn: 'root'
})
export class ReadyGameStatusTrigger extends StatusTrigger {
    async after(game: IGame): Promise<any> {
        await this.sendInvites(game);
        return this.router.navigate(['lobby','game', game.id], { queryParams: { action: 'play' }});
    }

    async before(game: IGame): Promise<any> {
        // Assign game owner
        const owner = await this.profileService.profile();
        const ownerPlayer: IPlayer = { created: new Date(), name: owner.displayName, owner: true, position: 0, profile: {
                uid: owner.uid,
                username: owner.username,
                displayName: owner.displayName,
                created: owner.created,
                token: owner.token,
            }, profileId: owner.uid };
        game.players.push(ownerPlayer);

        const bots = await this.createBots(game);
        game.players = game.players.concat([...bots]);

        await this.generateGame(game);
        await this.createChat(game, owner);
        return game;
    }

    async sendInvites(game: IGame): Promise<void> {
        await Promise.all(game.invites.map(async invite => {
            await this.inviteService.sendGameInvite(invite);
            await this.notificationService.sendGameInviteNotification(invite);
        }));
    }

    async createBots(game: IGame): Promise<IPlayer[]> {
        const bots = new Array(game.bots);
        return [...bots].map((bot, index) => {
            const player: IPlayer = {
                created: new Date(), name: `Bot ${index + 1}`, owner: false, position: game.players.length
            };
            game.players.push(player);
            return player;
        });
    }

    async createChat(game: IGame, owner: IProfileReadOnly) {
        const chat: IChat = {
            id: game.id,
            game: game as unknown as IGameReadOnly,
            level: ChatLevel.GAME,
            owner: owner.uid,
            participants: [owner],
            participantIds: [owner.uid],
            allowed: [owner.uid],
            messages: [],
        };
        await this.chatService.create(chat as unknown as IChat);
    }

    async generateGame(game: IGame): Promise<void> {
        await this.gameService.create(game);
    }

}
