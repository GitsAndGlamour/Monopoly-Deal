import {User} from 'firebase';
import {IPreferences, Preferences} from './preferences';
import {Base, IBase} from './base';

export interface  IProfile extends IBase {
    uid: string;
    displayName: string;
    username: string;
    preferences: IPreferences;
    friends: User[];
    pendingFriends: User[];
    friendInvitesSent: User[];
    declinedFriendInvites: User[];
    online: boolean;
}

export class Profile extends Base implements IProfile {
    uid: string;
    displayName: string;
    username: string;
    preferences: IPreferences;
    friends: User[];
    pendingFriends: User[];
    friendInvitesSent: User[];
    declinedFriendInvites: User[];
    online: boolean;

    constructor(props) {
        super(props);
        Object.assign(this, {}, props);
    }

    static blank(props): IProfile {
        return {
            uid: props.uid,
            displayName: props.displayName,
            username: props.username,
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
