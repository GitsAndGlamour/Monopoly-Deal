import {Injectable} from '@angular/core';
import {ProfileService} from '../profile/profile.service';
import {IGameInvite, IInvite, InvitationStatus} from '../../classes/invite';
import {StoreService} from '../firebase/store/store.service';
import {IProfileReadOnly} from '../../classes/profile';

@Injectable({
    providedIn: 'root'
})
export class InviteService {
    constructor(private profileService: ProfileService, private storage: StoreService<IInvite>) { }

    async getId(): Promise<string> {
        return this.storage.getId('invites');
    }

    async invites(): Promise<{ sent: IInvite[], received: IInvite[] }> {
        const sent = await this.sentInvites();
        const received = await this.receivedInvites();
        return {sent, received};
    }

    async sentInvites(): Promise<IInvite[]> {
        const profile = await this.profileService.profile();
        const invites = await this.storage.getCollectionWhere('invites', { fieldPath: 'fromId', opStr: '==', value: profile.uid });
        return invites && invites.length ? invites.filter(invite => invite.status === InvitationStatus.SENT) : [];
    }

    async receivedInvites() {
        const profile = await this.profileService.profile();
        const invites = await this.storage.getCollectionWhere('invites', { fieldPath: 'toId', opStr: '==', value: profile.uid });
        return invites && invites.length ? invites.filter(invite => invite.status === InvitationStatus.SENT) : [];
    }

    async sendFriendInvite(to: IProfileReadOnly) {
        const profile = await this.profileService.profile();
        const id = await this.storage.getId('invites');
        const invite: IInvite = {
            id, created: new Date(), from: profile, fromId: profile.uid, toId: to.uid, status: InvitationStatus.SENT, to
        };
        return this.storage.addDocument('invites', id, invite);
    }

    async sendGameInvite(invite: IGameInvite) {
        return this.storage.addDocument('invites', invite.id, invite);
    }

    async unsendFriendInvite(to: string): Promise<void> {
        const invites = await this.sentInvites();
        await Promise.all(invites.filter(invite => invite.toId === to).map(async invite => await this.storage.removeDocument('invites', invite.id)));
    }

    async acceptFriendInvite(from: string) {
        const invites = await this.receivedInvites();
        await Promise.all(invites.filter(invite => invite.fromId === from).map(async invite => await this.storage.updateDocument('invites' , invite.id, { status: InvitationStatus.ACCEPTED})));
        await this.profileService.addFriendToProfile(from);
        await this.profileService.addProfileToFriend(from);
    }

    async declineFriendInvite(from: string) {
        const invites = await this.receivedInvites();
        await Promise.all(invites.filter(invite => invite.fromId === from).map(async invite => await this.storage.updateDocument('invites' , invite.id, { status: InvitationStatus.DECLINED})))
    }
}
