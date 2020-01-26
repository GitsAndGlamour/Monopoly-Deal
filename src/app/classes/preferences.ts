export enum InvitePreference {
    FRIENDS_ONLY = 'Friends Only',
    ANYONE = 'Anyone',
}

export class Preferences {
    invites: InvitePreference;

    static get blank(): Preferences {
        return {
            invites: InvitePreference.ANYONE
        }
    }
}
