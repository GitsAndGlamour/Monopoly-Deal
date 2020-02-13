import {Injectable} from '@angular/core';
import {StoreService} from '../firebase/store/store.service';
import {ChatLevel, IChat, IMessage} from '../../classes/message';
import {ProfileService} from '../profile/profile.service';
import {IProfile, IProfileReadOnly} from '../../classes/profile';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(public storage: StoreService<IChat>, private profileService: ProfileService) {
    }

    async id() {
        return this.storage.getId('chat');
    }

    async chats() {
        const profile = await this.profileService.profile();
        return await this.storage
            .getCollectionWhere('chat', { fieldPath: 'participantIds', opStr: 'array-contains', value: profile.uid });
    }

    async chat(id: string) {
        return await this.storage.getDocument('chat', id);
    }

    create(chat: IChat) {
        const data = Object.assign({}, chat) as unknown as IChat;
        return this.storage.addDocument('chat', chat.id, data);
    }

    async lobby() {
        return await this.storage.getDocument('chat', 'lobby');
    }

    chatChanges() {
        return this.storage.getCollectionChanges('chat');
    }

    async sendMessage(chat: string, message: IMessage) {
        return await this.storage.addToArrayInDocument('chat', chat, 'messages', message);
    }

    async addParticipant(chat: string, participant: IProfileReadOnly) {
        return await this.storage.addToArrayInDocument('chat', chat, 'participants', participant);
    }
}
