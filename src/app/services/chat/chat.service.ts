import {Injectable} from '@angular/core';
import {StoreService} from '../firebase/store/store.service';
import {ChatLevel, IChat, IMessage} from '../../classes/message';
import {ProfileService} from '../profile/profile.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    constructor(public storage: StoreService<IChat>, private profileService: ProfileService) {
    }

    async init() {
    }

    async id() {
        return this.storage.getId('chat');
    }

    chatChanges() {
        return this.storage.getCollectionChanges('chat');
    }

    async lobby() {
        return await this.storage.getDocument('chat', 'lobby');
    }

    async chat(id: string) {
        return await this.storage.getDocument('chat', id);
    }

    async chats() {
        const profile = await this.profileService.profile();
        const participating = await this.storage.getCollectionWhere('chat', { fieldPath: 'participants', opStr: 'array-contains', value: profile.uid });
        const allowed = await this.storage.getCollectionWhere('chat', { fieldPath: 'allowed', opStr: 'array-contains', value: profile.uid });
        return [...participating, ...allowed];
    }

    async sendMessage(chat: string, message: IMessage) {
        return await this.storage.addToArrayInDocument('chat', chat, 'messages', message);
    }

    create(chat: IChat) {
        const data = Object.assign({}, chat) as unknown as IChat;
        return this.storage.addDocument('chat', chat.id, data);
    }
}
