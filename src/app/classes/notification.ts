
export enum NotificationType {
    INVITE = 'invite',
    MESSAGE = 'message',
    FRIEND = 'friend'
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
