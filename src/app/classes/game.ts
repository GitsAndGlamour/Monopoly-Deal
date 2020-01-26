import {Player} from './player';
import {Base} from './base';

export enum GameStatus {
    CANCELED = 'Canceled',
    READY = 'Waiting for more players to join',
    STARTED = 'Started',
    DONE = 'Done',
}

export class Game extends Base {
    id: number;
    name: string;
    owner: Player;
    seats: number;
    bots: number;
    public: boolean;
    viewable: boolean;
    friends: boolean;
    players: Player[];
    invitees: Player[];
    status: GameStatus;
    ranked: boolean;
}
