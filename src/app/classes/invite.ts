import {IBase} from './base';
import {IProfileReadOnly} from './profile';
import {IGameReadOnly} from './game';

export enum InvitationStatus {
    SENT = 'Sent',
    ACCEPTED = 'Accepted',
    DECLINED = 'Declined',
}

export interface IInvite extends IBase {
    id: string;
    toId: string;
    to: IProfileReadOnly;
    status: InvitationStatus;
    fromId: string;
    from: IProfileReadOnly;
}

export interface IGameInvite extends IInvite {
    game: IGameReadOnly;
}
