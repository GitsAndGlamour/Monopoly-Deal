import {User} from 'firebase';
import { Injectable } from '@angular/core';
import {StoreService} from '../firebase/store/store.service';
import {IProfile} from '../../classes/profile';
import {AuthService} from '../firebase/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private storage: StoreService<IProfile>, private auth: AuthService) {
  }

  async profile(): Promise<IProfile> {
    const user: User = this.auth.localUser;
    return this.storage.getDocument('profiles', user.uid);
  }

  async profiles() {
    return this.storage.getCollection('profiles');
  }

  async online(): Promise<IProfile[]> {
    return this.storage.getCollectionWhere('profiles', { fieldPath: 'online', opStr: '==', value: 'true'})
  }

  async friends(): Promise<IProfile[]> {
    const user = this.auth.localUser;
    const profile: IProfile = await this.storage.getDocument('profiles', user.uid);
    if (!!profile) {
      return await this.storage.getCollectionWhere('profiles', { fieldPath: 'uid', opStr: 'in', value: profile.friends.map(friend => friend.uid ) })
    }
    return [];
  }

  async create(profile: IProfile): Promise<void> {
    const data = Object.assign({}, profile) as unknown as IProfile;
    return await this.storage.addDocument('profiles', profile.uid, data);
  }

  async usernames(): Promise<string[]> {
    const profiles = await this.storage.getCollection('profiles');
    return profiles ? profiles.map(profile => profile.username) : [];
  }

  async usernameExists(value: string): Promise<IProfile[]> {
    return await this.storage.getCollectionWhere('profiles', { fieldPath: 'username', opStr: '==', value });
  }
}
