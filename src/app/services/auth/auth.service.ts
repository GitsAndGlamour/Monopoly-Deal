import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import {StoreService} from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(private firebase: AngularFireAuth, private userStorage: StoreService<User>) {
    firebase.authState.subscribe((user: User) => {
      console.log('authState', user);
      this.user = user;
      this.localUser = user;
    });
  }

  // Returns active authentication which can be subscribed to
  get state(): any {
    return this.firebase.auth;
  }

  get auth() {
    return null;
  }

  get localUser(): User {
    const item = localStorage.getItem('polymeets_user');
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  set localUser(user: User) {
    localStorage.setItem('polymeets_user', JSON.stringify(user));
  }

  clearLocalUser() {
    localStorage.removeItem('polymeets_user');
  }

  async getUserData(): Promise<User> {
    return await this.userStorage.getDocument('users', this.localUser.uid);
  }

  async createUserData(user: User): Promise<void> {
    console.log('createUserData', user);
    const data = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    } as unknown as User;
    return await this.userStorage.addDocument('users', user.uid, data);
  }

  async updateUserData(user: User): Promise<void> {
    console.log('updateUserData', user);
    const data = {
      name: user.displayName,
      email: user.email,
    } as unknown as User;
    return await this.userStorage.updateDocument('users', user.uid, data);
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return !!this.user || !!this.firebase.auth.currentUser;
  }

  // Returns current user
  get currentUser(): User {
    return this.authenticated ? this.user : this.firebase.auth.currentUser;
  }

  async signUp(email: string, password: string): Promise<void> {
    console.log('signUp');
    return await this.firebase.auth.createUserWithEmailAndPassword(email, password)
        .then((credential: UserCredential) => this.createUserData(credential.user))
        .then(() => this.signIn(email, password))
        .catch(error => {
          alert(error.message);
        });
  }

  async signIn(email: string, password: string): Promise<void> {
    console.log('signIn');
    return await this.firebase.auth.signInWithEmailAndPassword(email, password)
        .then((credential: UserCredential) => this.updateUserData(credential.user))
        .then(() => this.sendEmailVerification(email))
        .catch(error => {
          alert(error.message);
        });
  }

  async resetPassword(): Promise<void> {
    const email = prompt('Enter the e-mail address associated with your account and we\'ll e-mail you a link with ' +
        'instructions to reset your password.');
    console.log(email);
    if (email) {
      return await this.firebase.auth.sendPasswordResetEmail(email)
          .then(() => {
            alert('Great! Check your e-mail for a link to reset your password. :)');
          })
          .catch(error => {
            alert(error.message);
          });
    }
  }

  async sendEmailVerification(email): Promise<void> {
    return await this.firebase.auth.currentUser.sendEmailVerification()
        .then(() => {
          alert(`A verification link has been sent to your e-mail address provided (${email}).
Please verify your e-mail.`);
        }).catch(error => {
          alert(error.message);
        });
  }

  signOut(): Promise<void> {
    this.clearLocalUser();
    return this.firebase.auth.signOut();
  }

}
