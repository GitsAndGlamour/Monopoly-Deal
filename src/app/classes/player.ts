import {Base, IBase} from './base';
import {IGameReadOnly} from './game';
import {IProfileReadOnly} from './profile';

export interface IPlayer extends IBase {
    user?: IProfileReadOnly;
    name: string;
    position: number;
    game: IGameReadOnly;
    owner: boolean;
}

export class Player extends Base implements IPlayer {
    user?: IProfileReadOnly;
    name: string;
    position: number;
    game: IGameReadOnly;
    owner: boolean;
}
