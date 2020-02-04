import {Injectable} from '@angular/core';
import {StoreService} from '../firebase/store/store.service';
import {INotification, NotificationStatus, NotificationType} from '../../classes/notification';
import {ProfileService} from '../profile/profile.service';
import {IGame} from '../../classes/game';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private storage: StoreService<INotification>, private profileService: ProfileService) { }

    async notifications(): Promise<{[p: string]: INotification}> {
        const profile = await this.profileService.profile();
        return profile.notifications;
    }

    notificationChanges() {
        return this.profileService.profileChanges();
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

    async notification(id: string): Promise<INotification> {
        const notifications = await this.notifications();
        return notifications[id];
    }

    async sendInvite(game: IGame, invitee: string) {
        const id = await this.storage.getId('notifications');
        const profile = await this.profileService.profile();
        const invite = {
            id,
            link: `game/${game.id}`,
            type: NotificationType.INVITE,
            message: `You have a game invite from ${profile.displayName} for ${game.name}!`,
            status: NotificationStatus.NEW
        };
        await this.profileService.addNotification(invitee, invite);
    }
}
