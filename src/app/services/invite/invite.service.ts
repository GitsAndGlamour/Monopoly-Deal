import {Injectable} from '@angular/core';
import {ProfileService} from '../profile/profile.service';
import {IGameInvite, IInvite, InvitationStatus} from '../../classes/invite';
import {StoreService} from '../firebase/store/store.service';
import {IProfile} from '../../classes/profile';

@Injectable({
    providedIn: 'root'
})
export class InviteService {
    constructor(private profileService: ProfileService, private storage: StoreService<IInvite>) { }

    async getId(): Promise<string> {
        return this.storage.getId('invites');
    }

    async invites(): Promise<{ sent: IInvite[], received: IInvite[] }> {
        return {sent: [], received: []};
    }

    async sentInvites(): Promise<IInvite[]> {
        const profile = await this.profileService.profile();
        return this.storage.getCollectionWhere('invites', { fieldPath: 'fromId', opStr: '==', value: profile.uid });
    }

    async receivedInvites() {
        const profile = await this.profileService.profile();
        return this.storage.getCollectionWhere('invites', { fieldPath: 'toId', opStr: '==', value: profile.uid });
    }

    async sendFriendInvite(to: IProfile) {
        const profile = await this.profileService.profile();
        // const invite: IInvite = {
        //     created: new Date(), from: profile, fromId: profile.uid, toId: '', status: undefined, to: undefined
        // };
        // return this.storage.getCollectionWhere('invites', { fieldPath: 'fromId', opStr: '==', value: profile.uid });
    }

    async sendGameInvite(invite: IGameInvite) {
        return this.storage.addDocument('invites', invite.id, invite);
    }

    async unsendFriendInvite() {

    }

    async acceptFriendInvite() {

    }

    async declineFriendInvite() {

    }
}
