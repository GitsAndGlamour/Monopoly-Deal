export enum InvitePreference {
    FRIENDS_ONLY = 'Friends Only',
    ANYONE = 'Anyone',
}

export enum TokenPreference {
    SCOTTISH_TERRIER,
    BATTLESHIP,
    RACE_CAR_MID_CENTURY,
    TOP_HAT,
    PENGUIN,
    T_REX,
    CAT,
    RUBBER_DUCKY,
    THIMBLE,
    WHEELBARROW,
    SHOE,
    HORSE_AND_RIDER,
    HOWITZER,
    SACK_OF_MONEY,
    IRON_,
    TRAIN,
    CANNON,
    CAR_WITH_DRIVER,
    AIRPLANE,
    LANTERN_LATE,
    ROCKING_HORSE_LATE,
    PURSE_MID_CENTURY,
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
