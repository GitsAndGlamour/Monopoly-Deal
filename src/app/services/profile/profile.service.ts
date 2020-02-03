import {User} from 'firebase';
import {Injectable} from '@angular/core';
import {StoreService} from '../firebase/store/store.service';
import {IProfile, IProfileReadOnly} from '../../classes/profile';
import {AuthService} from '../firebase/auth/auth.service';

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

  async profiles() {
    return this.storage.getCollection('profiles');
  }

  async online(): Promise<IProfileReadOnly[]> {
    return this.storage.getCollectionWhere('profiles', { fieldPath: 'online', opStr: '==', value: 'true'})
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

  async addFriends(uidList: string[]): Promise<void> {
    const user = this.auth.localUser;
    await this.storage.addToArrayInDocument('profiles', user.uid, 'friends', uidList);
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
}
