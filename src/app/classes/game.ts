import {IPlayer} from './player';
import {Base, IBase} from './base';

export enum GameStatus {
    CANCELED = 'Canceled',
    READY = 'Waiting for more players to join',
    STARTED = 'Started',
    DONE = 'Done',
}

export interface IGame extends IBase {
    id: number;
    name: string;
    owner: IPlayer;
    seats: number;
    bots: number;
    public: boolean;
    viewable: boolean;
    friends: boolean;
    players: IPlayer[];
    invitees: IPlayer[];
    status: GameStatus;
    ranked: boolean;
}

export class Game extends Base implements IGame {
    id: number;
    name: string;
    owner: IPlayer;
    seats: number;
    bots: number;
    public: boolean;
    viewable: boolean;
    friends: boolean;
    players: IPlayer[];
    invitees: IPlayer[];
    status: GameStatus;
    ranked: boolean;

    constructor(props) {
        super(props);
        Object.assign(this, {}, props);
    }
}
