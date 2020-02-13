import {User} from 'firebase';
import {Injectable} from '@angular/core';
import {StoreService} from '../firebase/store/store.service';
import {IProfile, IProfileReadOnly} from '../../classes/profile';
import {AuthService} from '../firebase/auth/auth.service';
import {TokenPreference} from '../../classes/preferences';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(protected storage: StoreService<IProfile>, protected auth: AuthService) {
  }

  async profile(): Promise<IProfile> {
    const user: User = this.auth.localUser;
    return this.storage.getDocument('profiles', user.uid);
  }

  async profiles() {
    return this.storage.getCollection('profiles');
  }

  profileChanges(): Observable<any> {
    const user: User = this.auth.localUser;
    return this.storage.getDocumentChanges('profiles', user.uid);
  }

  async create(profile: IProfile): Promise<void> {
    const data = Object.assign({}, profile) as unknown as IProfile;
    return await this.storage.addDocument('profiles', profile.uid, data);
  }

  async update(profile: Partial<IProfileReadOnly>) {
    return this.storage.updateDocument('profiles', profile.uid, profile);
  }

  async usernames(): Promise<string[]> {
    const profiles = await this.storage.getCollection('profiles');
    return profiles ? profiles.map(profile => profile.username) : [];
  }

  async usernameExists(value: string): Promise<boolean> {
    const results = await this.storage.getCollectionWhere('profiles', {fieldPath: 'username', opStr: '==', value});
    return results && results.length > 0;
  }

  async online(): Promise<IProfileReadOnly[]> {
    return this.storage.getCollectionWhere('profiles', { fieldPath: 'online', opStr: '==', value: true})
  }

  async showOnline(): Promise<void> {
    const user = this.auth.localUser;
    return await this.storage.updateDocument('profiles', user.uid, { online: true });
  }

  async showOffline() {
    await this.storage.updateDocument('profiles', this.auth.localUser.uid, { online: false });
  }

  async updateToken(token: TokenPreference) {
    const user = this.auth.localUser;
    await this.storage.updateDocument('profiles', user.uid, { token } as unknown as IProfile)
  }
}
