import {IInvite} from './invite';

export enum NotificationType {
    GAME_INVITE = 'Game Invite',
    GAME_REQUEST = 'Game Request',
    GAME_UPDATE = 'Game Activity Update',
    MESSAGE = 'New Message',
    FRIEND_INVITE = 'Friend Invite',
    FRIEND_ACCEPT = 'Friend Invite Accept',
}

export enum NotificationStatus {
    NEW = 'new',
    READ = 'read'
}

export interface INotification {
    id: string;
    type: NotificationType;
    message: string;
    link: string;
    status: NotificationStatus;
}

export interface IInviteNotification extends INotification {
    invite: IInvite;
}

export class Notification implements INotification {
    id: string;
    type: NotificationType;
    link: string;
    status: NotificationStatus;
    message: string;

    constructor(props) {
        Object.assign(this, {}, props);
        this.status = NotificationStatus.NEW;
    }
}
