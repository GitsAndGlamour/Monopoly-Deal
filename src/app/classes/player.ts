import {Base, IBase} from './base';
import {IGameReadOnly} from './game';
import {IProfileReadOnly} from './profile';

export interface IPlayer extends IBase {
    profile?: string; // Profile ID
    name: string;
    position: number;
    owner: boolean;
}

export class Player extends Base implements IPlayer {
    profile?: string; // Profile ID
    name: string;
    position: number;
    owner: boolean;
}
