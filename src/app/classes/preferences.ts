export enum InvitePreference {
    FRIENDS_ONLY = 'Friends Only',
    ANYONE = 'Anyone',
}

export interface IPreferences {
    invites: InvitePreference;
}

export class Preferences implements IPreferences {
    invites: InvitePreference;

    static get blank(): Preferences {
        return {
            invites: InvitePreference.ANYONE
        }
    }
}
