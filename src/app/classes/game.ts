import {Base, IBase} from './base';
import {IPlayer} from './player';

export enum GameStatus {
    CANCELED = 'Canceled',
    READY = 'Ready',
    STARTED = 'Started',
    DONE = 'Done',
}

export enum InvitationStatus {
    SENT = 'Sent',
    ACCEPTED = 'Accepted',
    DECLINED = 'Declined',
}

export interface IInvite extends IBase {
    profile: string;
    status: InvitationStatus;
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
    invitees: IInvite[];
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
    players: IPlayer[]; // Profile IDs
    invitees: IInvite[]; // Profile IDs
    status: GameStatus;
    ranked: boolean;

    constructor(props) {
        super(props);
        Object.assign(this, {}, props);
    }
}
