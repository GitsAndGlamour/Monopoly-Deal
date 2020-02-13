import {Injectable} from '@angular/core';
import {IProfile, IProfileReadOnly} from '../../classes/profile';
import {ProfileService} from './profile.service';

@Injectable({
    providedIn: 'root'
})
export class FriendProfileService extends ProfileService {

    async friends(): Promise<IProfileReadOnly[]> {
        const user = this.auth.localUser;
        const profile: IProfile = await this.storage.getDocument('profiles', user.uid);
        if (!!profile) {
            return await this.storage
                .getCollectionWhere('profiles', { fieldPath: 'uid', opStr: 'in', value: profile.friends })
        }
        return [];
    }

    async addFriendToProfile(uid: string): Promise<void> {
        const user = this.auth.localUser;
        await this.storage.addToArrayInDocument('profiles', user.uid, 'friends', uid);
    }

    async addProfileToFriend(uid: string): Promise<void> {
        const user = this.auth.localUser;
        await this.storage.addToArrayInDocument('profiles', uid, 'friends', user.uid);
    }

    async removeFriend(uid: string): Promise<void> {
        const user = this.auth.localUser;
        await this.storage.removeFromArrayInDocument('profiles', user.uid, 'friends', uid);
    }

    async addFriends(uidList: string[]): Promise<void[]> {
        const user = this.auth.localUser;
        return Promise.all(
            await uidList
                .map(async uid => await this.storage.addToArrayInDocument('profiles', user.uid, 'friends', uid)));
    }
}
