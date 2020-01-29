import {IPreferences, Preferences} from './preferences';
import {Base, IBase} from './base';

export interface  IProfile extends IBase {
    uid: string;
    username: string;
    displayName: string;
    online: boolean;
    friends: IProfileReadOnly[];
    pendingFriends: IProfileReadOnly[];
    friendInvitesSent: IProfileReadOnly[];
    declinedFriendInvites: IProfileReadOnly[];
    preferences: IPreferences;
}

export type IProfileReadOnly = Omit<IProfile, 'friends' | 'pendingFriends' | 'friendInvitesSent' | 'declinedFriendInvites' | 'preferences'>;

export type IProfileWrite = Omit<IProfileReadOnly, 'uid' | 'username' | 'online'>;

export type IProfileFriendWrite = Omit<IProfileWrite, 'displayName' | 'preferences'>;

export class Profile extends Base implements IProfile {
    uid: string;
    displayName: string;
    username: string;
    preferences: IPreferences;
    friends: IProfileReadOnly[];
    pendingFriends: IProfileReadOnly[];
    friendInvitesSent: IProfileReadOnly[];
    declinedFriendInvites: IProfileReadOnly[];
    online: boolean;

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
            created: new Date()
        }
    }
}
