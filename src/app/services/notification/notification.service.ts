import {Injectable} from '@angular/core';
import {StoreService} from '../firebase/store/store.service';
import {IInviteNotification, INotification, NotificationStatus, NotificationType} from '../../classes/notification';
import {IGameInvite} from '../../classes/invite';
import {NotificationProfileService} from '../profile/notification-profile.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private storage: StoreService<INotification>, private profileService: NotificationProfileService) { }

    async getId(): Promise<string> {
        return this.storage.getId('notifications');
    }

    async notification(id: string): Promise<INotification> {
        const notifications = await this.notifications();
        return notifications[id];
    }

    async notifications(): Promise<{[p: string]: INotification}> {
        const profile = await this.profileService.profile();
        return profile.notifications;
    }

    async new(): Promise<INotification[]> {
        const profile = await this.profileService.profile();
        if (profile && profile.notifications && profile.notifications) {
            return Object.keys(profile.notifications)
                .filter(key => profile.notifications[key].status === NotificationStatus.NEW)
                .map(key => profile.notifications[key]);
        }
        return [];
    }

    async newFromProfile(profile): Promise<INotification[]> {
        if (profile && profile.notifications && profile.notifications) {
            return Object.keys(profile.notifications)
                .filter(key => profile.notifications[key].status === NotificationStatus.NEW)
                .map(key => profile.notifications[key]);
        }
        return [];
    }

    async all(): Promise<INotification[]> {
        const profile = await this.profileService.profile();
        if (profile && profile.notifications && profile.notifications) {
            return Object.keys(profile.notifications)
                .map(key => profile.notifications[key]);
        }
        return [];
    }

    async sendGameInviteNotification(invite: IGameInvite) {
        const id = await this.getId();
        const notification: IInviteNotification = {
            id,
            link: `game/${invite.game.id}`,
            type: NotificationType.GAME_INVITE,
            message: `You have a game invite from ${invite.from.displayName} for ${invite.game.name}!`,
            status: NotificationStatus.NEW,
            invite
        };
        const notifications = await this.notifications();
        notifications[id] = notification;
        await this.profileService.addNotification(invite.toId, notifications);
    }

    async markAllAsRead() {
        let notifications: { [p: string]: INotification } = {};
        const profile = await this.profileService.profile();
        notifications = profile.notifications;
        if (profile && profile.notifications && profile.notifications) {
            Object.keys(profile.notifications)
                .filter(key => notifications[key].status === NotificationStatus.NEW)
                .map(key => notifications[key].status = NotificationStatus.READ)
        }
        await this.profileService.updateNotifications(notifications);
    }
}
