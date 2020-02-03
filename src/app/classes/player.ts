import {Base, IBase} from './base';
import {IGameReadOnly} from './game';
import {IProfileReadOnly} from './profile';

export interface IPlayer extends IBase {
    user?: string; // Profile ID
    name: string;
    position: number;
    game: string; // Game ID
    owner: boolean;
}

export class Player extends Base implements IPlayer {
    user?: string; // Profile ID
    name: string;
    position: number;
    game: string; // Game ID
    owner: boolean;
}
