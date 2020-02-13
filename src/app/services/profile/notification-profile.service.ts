import {Injectable} from '@angular/core';
import {INotification} from '../../classes/notification';
import {ProfileService} from './profile.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationProfileService extends ProfileService {
    async addNotification(to: string, notifications: { [p: string]: INotification }) {
        await this.storage.updateDocument('profiles', to, { notifications } as unknown);
    }

    async updateNotifications(notifications: { [p: string]: INotification }) {
        const user = this.auth.localUser;
        await this.storage.updateDocument('profiles', user.uid, { notifications } as unknown);
    }
}
