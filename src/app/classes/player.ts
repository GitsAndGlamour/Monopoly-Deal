import {Base, IBase} from './base';
import {IGameReadOnly} from './game';
import {IProfileReadOnly} from './profile';

export interface IPlayer extends IBase {
    profileId?: string;
    profile?: IProfileReadOnly;
    name: string;
    position: number;
    owner: boolean;
}

export class Player extends Base implements IPlayer {
    profileId?: string;
    profile?: IProfileReadOnly;
    name: string;
    position: number;
    owner: boolean;
}
