import {User} from 'firebase';
import {Preferences} from './preferences';

export class Profile {
    uid: string;
    displayName: string;
    username: string;
    preferences: Preferences;
    friends: User[];
    pendingFriends: User[];
    friendInvitesSent: User[];
    declinedFriendInvites: User[];
    online: boolean;

    static blank(user: User, username: string): Profile {
        return {
            uid: user.uid,
            displayName: user.displayName,
            username,
            preferences: Preferences.blank,
            friends: [],
            pendingFriends: [],
            friendInvitesSent: [],
            declinedFriendInvites: [],
            online: true,
        }
    }
}
