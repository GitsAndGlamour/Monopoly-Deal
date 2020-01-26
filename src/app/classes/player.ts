import {Base} from './base';
import {User} from 'firebase';
import {Game} from './game';

export class Player extends Base {
    user?: User;
    name: string;
    position: number;
    game: Game;
    owner: boolean;
}
