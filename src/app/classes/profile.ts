import {IPreferences, Preferences} from './preferences';
import {Base, IBase} from './base';
import {INotification} from './notification';

export interface  IProfile extends IBase {
    uid: string;
    username: string;
    displayName: string;
    online: boolean;
    friends: string[]; // Profile IDs
    pendingFriends: string[]; // Profile IDs
    friendInvitesSent: string[]; // Profile IDs
    declinedFriendInvites: string[]; // Profile IDs
    preferences: IPreferences;
    notifications: {[p: string]: INotification};
}

export type IProfileReadOnly = Omit<IProfile, 'friends' | 'pendingFriends' | 'friendInvitesSent' | 'declinedFriendInvites' | 'preferences' | 'online' | 'notifications'>;

export type IProfileWrite = Omit<string, 'uid' | 'username' | 'notifications'>;

export type IProfileFriendWrite = Omit<IProfileWrite, 'displayName' | 'preferences' | 'notifications'>;

export class Profile extends Base implements IProfile {
    uid: string;
    displayName: string;
    username: string;
    preferences: IPreferences;
    friends: string[]; // Profile IDs
    pendingFriends: string[]; // Profile IDs
    friendInvitesSent: string[]; // Profile IDs
    declinedFriendInvites: string[]; // Profile IDs
    online: boolean;
    image: string;
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
            friends: [],
            pendingFriends: [],
            friendInvitesSent: [],
            declinedFriendInvites: [],
            online: true,
            created: new Date(),
            notifications: {}
        }
    }
}
