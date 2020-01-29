import {Injectable} from '@angular/core';
import {User} from 'firebase';
import {AuthService} from '../../app/services/firebase/auth/auth.service';
import {MockAngularFireAuth} from './firebase/firebase.auth.mock';
import {MockLocalStorage} from './local-storage.mock';
import {UserService} from '../../app/services/user/user.service';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
    providedIn: 'root'
})
export class AuthServiceMock extends AuthService {
    user: User;
    constructor(public firebase: MockAngularFireAuth, public userService: UserService) {
        super(firebase, userService);
        firebase.authState.subscribe((user: User) => {
            this.user = user;
            this.localUser = user;
        });
    }

    get localUser(): User {
        const item = MockLocalStorage.getItem('monopoly_user');
        if (item) {
            return JSON.parse(item);
        }
        return null;
    }

    set localUser(user: User) {
        MockLocalStorage.setItem('monopoly_user', JSON.stringify(user));
    }

    clearLocalUser() {
        MockLocalStorage.removeItem('monopoly_user');
    }

    async createUserData(user: User, displayName: string): Promise<void> {
        return this.userService.create({displayName, ...user});
    }

    async updateUserData(user: User): Promise<void> {
        return this.userService.update(user);
    }

    // Returns true if user is logged in
    get authenticated(): boolean {
        return !!this.user || !!this.firebase.auth.currentUser;
    }

    // Returns current user
    get currentUser(): User {
        return this.authenticated ? this.user : this.firebase.auth.currentUser;
    }

    async signUp(email: string, password: string, displayName: string): Promise<void> {
        return await this.firebase.auth.createUserWithEmailAndPassword(email, password)
            .then((credential: UserCredential) => this.createUserData(credential.user, displayName))
            .then(() => this.signIn(email, password))
            .catch(error => {
                alert(error.message);
            });
    }

    async signIn(email: string, password: string): Promise<void> {
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
