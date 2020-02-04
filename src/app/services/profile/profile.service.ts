import {User} from 'firebase';
import {Injectable} from '@angular/core';
import {StoreService} from '../firebase/store/store.service';
import {IProfile, IProfileReadOnly} from '../../classes/profile';
import {AuthService} from '../firebase/auth/auth.service';
import {TokenPreference} from '../../classes/preferences';
import {INotification} from '../../classes/notification';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(public storage: StoreService<IProfile>, public auth: AuthService) {
  }

  async profile(): Promise<IProfile> {
    const user: User = this.auth.localUser;
    return this.storage.getDocument('profiles', user.uid);
  }

  profileChanges(): Observable<any> {
    const user: User = this.auth.localUser;
    return this.storage.getDocumentChanges('profiles', user.uid);
  }

  async profiles() {
    return this.storage.getCollection('profiles');
  }

  async online(): Promise<IProfileReadOnly[]> {
    return this.storage.getCollectionWhere('profiles', { fieldPath: 'online', opStr: '==', value: true})
  }

  async friends(): Promise<IProfileReadOnly[]> {
    const user = this.auth.localUser;
    const profile: IProfile = await this.storage.getDocument('profiles', user.uid);
    if (!!profile) {
      return await this.storage.getCollectionWhere('profiles', { fieldPath: 'uid', opStr: 'in', value: profile.friends })
    }
    return [];
  }

  async addFriend(uid: string): Promise<void> {
    const user = this.auth.localUser;
    await this.storage.addToArrayInDocument('profiles', user.uid, 'friends', uid);
  }

  async removeFriend(uid: string): Promise<void> {
    const user = this.auth.localUser;
    await this.storage.removeFromArrayInDocument('profiles', user.uid, 'friends', uid);
  }

  async addFriends(uidList: string[]): Promise<void[]> {
    const user = this.auth.localUser;
    return Promise.all(await uidList.map(async uid => await this.storage.addToArrayInDocument('profiles', user.uid, 'friends', uid)));
  }

  async create(profile: IProfile): Promise<void> {
    const data = Object.assign({}, profile) as unknown as IProfile;
    return await this.storage.addDocument('profiles', profile.uid, data);
  }

  async usernames(): Promise<string[]> {
    const profiles = await this.storage.getCollection('profiles');
    return profiles ? profiles.map(profile => profile.username) : [];
  }

  async usernameExists(value: string): Promise<boolean> {
    const results = await this.storage.getCollectionWhere('profiles', {fieldPath: 'username', opStr: '==', value});
    return results && results.length > 0;
  }

  async showOnline(): Promise<void> {
    const user = this.auth.localUser;
    return await this.storage.updateDocument('profiles', user.uid, { online: true });
  }

  async updateToken(token: TokenPreference) {
    const user = this.auth.localUser;
    await this.storage.updateDocument('profiles', user.uid, { preferences: { token }} as unknown as IProfile)
  }

  async addNotification(invitee: string, notification: INotification) {
    console.log(invitee, notification);
    await this.storage.updateDocument('profiles', invitee, { notifications: { [notification.id]: notification }});
  }

  async showOffline() {
    await this.storage.updateDocument('profiles', this.auth.localUser.uid, { online: false });
  }
}
