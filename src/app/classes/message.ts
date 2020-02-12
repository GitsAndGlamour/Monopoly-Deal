import * as firebase from 'firebase';
import {IProfileReadOnly} from './profile';
import {IGameReadOnly} from './game';
import {Base} from './base';
import Timestamp = firebase.firestore.Timestamp;


export interface IChat {
    id: string;
    level: ChatLevel;
    messages: IMessage[];
    participants: IProfileReadOnly[];
    owner?: string;
    game?: IGameReadOnly;
    room?: IRoom;
}

export class Chat extends Base implements IChat {
    id: string;
    level: ChatLevel;
    messages: IMessage[];
    participants: IProfileReadOnly[];
    allowed?: string[];
    owner?: string;
    game?: IGameReadOnly;
    room?: IRoom;

    constructor(props) {
        super(props);
        Object.assign(this, props);
    }


    get name(): string {
        switch(this.level) {
            case ChatLevel.LOBBY: return 'Lobby';
            case ChatLevel.GAME: return 'Game ' + this.game.name;
            case ChatLevel.ROOM: return 'Room ' + this.room.name;
        }
    }
}

export interface IRoom {
    id: string;
    name: string;
    public: boolean;
    owner: string;
}

export enum ChatLevel {
    GAME,
    ROOM,
    LOBBY,
}

export interface IMessage {
    id: string;
    fromId: string;
    from: IProfileReadOnly;
    value: string;
    sent: Date | Timestamp;
    read: Map<string, boolean>;
}
