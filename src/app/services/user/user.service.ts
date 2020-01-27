import {User} from 'firebase';
import { Injectable } from '@angular/core';
import {StoreService} from '../firebase/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage: StoreService<User>) { }

  async create(user: User): Promise<void> {
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    } as unknown as User;
    return await this.storage.addDocument('users', user.uid, data)
  }

  async update(user: User): Promise<void> {
    const data = {
      email: user.email,
    } as unknown as User;
    return await this.storage.updateDocument('users', user.uid, data);
  }

  async user(uid: string): Promise<User> {
    return await this.storage.getDocument('users', uid);
  }
}
