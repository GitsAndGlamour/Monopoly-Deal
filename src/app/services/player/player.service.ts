import {Injectable} from '@angular/core';
import {StoreService} from '../firebase/store/store.service';
import {IProfileReadOnly} from '../../classes/profile';
import {AuthService} from '../firebase/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(public storage: StoreService<IProfileReadOnly>, public auth: AuthService) {
  }

  async player(uid: string): Promise<IProfileReadOnly> {
    return this.storage.getDocument('profiles', uid);
  }

  async online(): Promise<IProfileReadOnly[]> {
    return this.storage.getCollectionWhere('profiles', { fieldPath: 'online', opStr: '==', value: true})
  }

  onlineChanges() {
    return this.storage.getCollectionChanges('profiles');
  }
}
