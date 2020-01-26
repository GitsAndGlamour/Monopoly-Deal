import {User} from 'firebase';
import { Injectable } from '@angular/core';
import {StoreService} from '../firebase/store/store.service';
import {Profile} from '../../classes/profile';
import {AuthService} from '../firebase/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  collection: 'profiles';
  constructor(private storage: StoreService<Profile>, private auth: AuthService) {
  }

  async profile(): Promise<Profile> {
    const user: User = this.auth.localUser;
    return this.storage.getDocument(this.collection, user.uid);
  }

  async profiles() {
    return this.storage.getCollection(this.collection);
  }

  async online(): Promise<Profile[]> {
    return this.storage.getCollectionWhere(this.collection, { fieldPath: 'online', opStr: '==', value: 'true'})
  }

  async friends(): Promise<Profile[]> {
    const user = this.auth.localUser;
    const profile: Profile = await this.storage.getDocument('profiles', user.uid);
    return await this.storage.getCollectionWhere('profiles', { fieldPath: 'uid', opStr: 'in', value: profile.friends.map(friend => friend.uid ) })
  }
}
