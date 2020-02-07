import {Base, IBase} from './base';
import {IPlayer} from './player';
import {IProfileReadOnly} from './profile';
import {IGameInvite} from './invite';
import {ITable} from './table';

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
    players: IPlayer[];
    invites: IGameInvite[];
    attendees: string[];
    status: GameStatus;
    ranked: boolean;
    table?: ITable;
    winner?: string;
}

export type IGameReadOnly = Omit<IGame,
    'owner'    |
    'seats'    |
    'bots'     |
    'public'   |
    'viewable' |
    'friends'  |
    'players'  |
    'invites'  |
    'ranked'   |
    'created'  |
    'attendees'|
    'winner'   |
    'table'>;
export type IGameWrite = Omit<IGame, 'id' | 'ranked' | 'status' | 'owner' | 'created'>;

export class Game extends Base implements IGame {
    id: string;
    name: string;
    owner: string;
    seats: number;
    bots: number;
    public: boolean;
    viewable: boolean;
    friends: boolean;
    players: IPlayer[];
    invites: IGameInvite[];
    status: GameStatus;
    ranked: boolean;
    attendees: string[];
    winner?: string;
    table?: ITable;

    constructor(props) {
        super(props);
        Object.assign(this, {}, props);
    }
}
