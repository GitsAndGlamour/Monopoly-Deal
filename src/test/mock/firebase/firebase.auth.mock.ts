import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import firebase, {User} from 'firebase';
import {MockLocalStorage} from '../local-storage.mock';
import Auth = firebase.auth.Auth;

export class MockFirebaseUser implements User {
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: firebase.auth.UserMetadata;
    phoneNumber: string | null;
    photoURL: string | null;
    providerData: (firebase.UserInfo | null)[];
    providerId: string;
    refreshToken: string;
    tenantId: string | null;
    uid: string;

    delete(): Promise<void> {
        return undefined;
    }

    getIdToken(forceRefresh?: boolean): Promise<string> {
        return undefined;
    }

    getIdTokenResult(forceRefresh?: boolean): Promise<firebase.auth.IdTokenResult> {
        return undefined;
    }

    linkAndRetrieveDataWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
        return undefined;
    }

    linkWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
        return undefined;
    }

    linkWithPhoneNumber(phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier): Promise<firebase.auth.ConfirmationResult> {
        return undefined;
    }

    linkWithPopup(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
        return undefined;
    }

    linkWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
        return undefined;
    }

    reauthenticateAndRetrieveDataWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
        return undefined;
    }

    reauthenticateWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
        return undefined;
    }

    reauthenticateWithPhoneNumber(phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier): Promise<firebase.auth.ConfirmationResult> {
        return undefined;
    }

    reauthenticateWithPopup(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
        return undefined;
    }

    reauthenticateWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
        return undefined;
    }

    reload(): Promise<void> {
        return undefined;
    }

    sendEmailVerification(actionCodeSettings?: firebase.auth.ActionCodeSettings | null): Promise<void> {
        return undefined;
    }

    toJSON(): Object {
        return undefined;
    }

    unlink(providerId: string): Promise<firebase.User> {
        return undefined;
    }

    updateEmail(newEmail: string): Promise<void> {
        return undefined;
    }

    updatePassword(newPassword: string): Promise<void> {
        return undefined;
    }

    updatePhoneNumber(phoneCredential: firebase.auth.AuthCredential): Promise<void> {
        return undefined;
    }

    updateProfile(profile: { displayName?: string | null; photoURL?: string | null }): Promise<void> {
        return undefined;
    }

}
export class MockFirebaseAuth implements Auth {
    app: firebase.app.App;
    languageCode: string | null;
    settings: firebase.auth.AuthSettings;
    tenantId: string | null;

    get currentUser(): MockFirebaseUser {
        return JSON.parse(MockLocalStorage.getItem('user')) as User;
    }

    set currentUser(user: User) {
        MockLocalStorage.setItem(user.email, JSON.stringify(user));
    }

    applyActionCode(code: string): Promise<void> {
        return undefined;
    }

    checkActionCode(code: string): Promise<firebase.auth.ActionCodeInfo> {
        return undefined;
    }

    confirmPasswordReset(code: string, newPassword: string): Promise<void> {
        return undefined;
    }

    createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential> {
        const user = {
            uid: 'MzcYKDpjeROPmtmEd8AU',
            email: email,
        } as unknown as User;

        MockLocalStorage.setItem(user.email, JSON.stringify({password, ...user}));

        return of({
            credential: null,
            user,
        }).toPromise();
    }

    fetchSignInMethodsForEmail(email: string): Promise<Array<string>> {
        return undefined;
    }

    getRedirectResult(): Promise<firebase.auth.UserCredential> {
        return undefined;
    }

    isSignInWithEmailLink(emailLink: string): boolean {
        return false;
    }

    onAuthStateChanged(nextOrObserver: firebase.Observer<any> | ((a: (firebase.User | null)) => any), error?: (a: firebase.auth.Error) => any, completed?: () => void): () => void {
        return undefined;
    }

    onIdTokenChanged(nextOrObserver: firebase.Observer<any> | ((a: (firebase.User | null)) => any), error?: (a: firebase.auth.Error) => any, completed?: () => void): () => void {
        return undefined;
    }

    sendPasswordResetEmail(email: string, actionCodeSettings?: firebase.auth.ActionCodeSettings | null): Promise<void> {
        return undefined;
    }

    sendSignInLinkToEmail(email: string, actionCodeSettings: firebase.auth.ActionCodeSettings): Promise<void> {
        return undefined;
    }

    setPersistence(persistence: string): Promise<void> {
        return undefined;
    }

    signInAndRetrieveDataWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
        return undefined;
    }

    signInAnonymously(): Promise<firebase.auth.UserCredential> {
        return undefined;
    }

    signInWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
        return undefined;
    }

    signInWithCustomToken(token: string): Promise<firebase.auth.UserCredential> {
        return undefined;
    }

    signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential> {

        const user = JSON.parse(MockLocalStorage.getItem(email));
        if (password === user.password) {
            MockLocalStorage.setItem('user', email);
            return of({
                credential: null,
                user,
            }).toPromise();
        } else {
            throw new Error('Invalid password!');
        }
    }

    signInWithEmailLink(email: string, emailLink?: string): Promise<firebase.auth.UserCredential> {
        return undefined;
    }

    signInWithPhoneNumber(phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier): Promise<firebase.auth.ConfirmationResult> {
        return undefined;
    }

    signInWithPopup(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
        return undefined;
    }

    signInWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
        return undefined;
    }

    signOut(): Promise<void> {
        return of(MockLocalStorage.removeItem('user')).toPromise();
    }

    updateCurrentUser(user: firebase.User | null): Promise<void> {
        this.currentUser = user;
        return of(null).toPromise()
    }

    useDeviceLanguage(): void {
    }

    verifyPasswordResetCode(code: string): Promise<string> {
        return undefined;
    }

}

export class MockAngularFireAuth extends AngularFireAuth {
    get authState(): Observable<User | null> {
        return this.user;
    }

    set authState(user: Observable<User>) {
        user.subscribe(result => {
            this.auth.currentUser = result;
        });
    }

    get user(): Observable<User | null> {
        return of(this.auth.currentUser);
    }

    set user(user: Observable<User>) {
        user.subscribe(result => {
            this.auth.currentUser = result;
        })
    }

    readonly auth: MockFirebaseAuth;
}
