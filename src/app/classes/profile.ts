import {IPreferences, Preferences, TokenPreference} from './preferences';
import {Base, IBase} from './base';
import {INotification} from './notification';
import {IInvite} from './invite';

export interface  IProfile extends IBase {
    uid: string;
    username: string;
    displayName: string;
    online: boolean;
    friends: string[]; // Profile IDs
    preferences: IPreferences;
    token: TokenPreference;
    notifications: {[p: string]: INotification};
}

export type IProfileReadOnly = Omit<IProfile, 'friends' | 'preferences' | 'online' | 'notifications'>;

export type IProfileWrite = Omit<string, 'uid' | 'username' | 'notifications'>;

export type IProfileFriendWrite = Omit<IProfileWrite, 'displayName' | 'preferences' | 'notifications'>;

export class Profile extends Base implements IProfile {
    uid: string;
    displayName: string;
    username: string;
    preferences: IPreferences;
    friends: string[]; // Profile IDs
    online: boolean;
    token: TokenPreference;
    notifications: {[p: string]: INotification};

    constructor(props) {
        super(props);
        Object.assign(this, {}, props);
    }

    static blank(props): IProfile {
        return {
            uid: props.uid,
            username: props.username,
            displayName: props.displayName,
            preferences: Preferences.blank,
            token: TokenPreference.MR_MONOPOLY,
            friends: [],
            online: true,
            created: new Date(),
            notifications: {}
        }
    }
}
