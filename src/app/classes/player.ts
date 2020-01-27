import {Base, IBase} from './base';
import {User} from 'firebase';
import {IGame} from './game';

export interface IPlayer extends IBase {
    user?: User;
    name: string;
    position: number;
    game: IGame;
    owner: boolean;
}

export class Player extends Base implements IPlayer {
    user?: User;
    name: string;
    position: number;
    game: IGame;
    owner: boolean;
}
