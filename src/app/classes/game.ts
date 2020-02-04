import {Base, IBase} from './base';

export enum GameStatus {
    CANCELED = 'Canceled',
    READY = 'Ready',
    STARTED = 'Started',
    DONE = 'Done',
}

export interface IGame extends IBase {
    id: string;
    name: string;
    owner: string;
    seats: number;
    bots: number;
    public: boolean;
    viewable: boolean;
    friends: boolean;
    players: string[];
    invitees: string[];
    status: GameStatus;
    ranked: boolean;
}

export type IGameReadOnly = Omit<IGame, 'owner' | 'seats' | 'bots' | 'public' | 'viewable' | 'friends' | 'players' | 'invitees' | 'ranked'>;

export type IGameWrite = Omit<IGame, 'id' | 'ranked' | 'status' | 'owner' | 'created'>;

export class Game extends Base implements IGame {
    id: string;
    name: string;
    owner: string; // Profile ID
    seats: number;
    bots: number;
    public: boolean;
    viewable: boolean;
    friends: boolean;
    players: string[]; // Profile IDs
    invitees: string[]; // Profile IDs
    status: GameStatus;
    ranked: boolean;

    constructor(props) {
        super(props);
        Object.assign(this, {}, props);
    }
}
