export enum InvitePreference {
    FRIENDS_ONLY = 'Friends Only',
    ANYONE = 'Anyone',
}

export enum TokenPreference {
    MR_MONOPOLY = 'Mr. Monopoly',
    SCOTTISH_TERRIER = 'Scottish Terrier',
    SHIP = 'Ship',
    CAR = 'Car',
    TOP_HAT = 'Top Hat',
    PENGUIN = 'Penguin',
    CHESS_PIECE = 'Chess Piece',
    CAT = 'Cat',
    THEATRE_FACES = 'Theatre Faces',
    NEEDLE_AND_THREAD = 'Needle and Thread',
    COG = 'Cog',
    HIGH_HEEL = 'High Heel',
    SNEAKER = 'Sneaker',
    HORSE = 'Horse',
    BOW_AND_ARROW = 'Bow and Arrow',
    SACK_OF_MONEY = 'Sack of Money',
    IRON_ = 'Iron',
    TRAIN = 'Train',
    HAPPY_FACE = 'Happy Face',
    POOP = 'Poop',
    BOMB = 'Bomb',
    AIRPLANE = 'Airplane',
    LANTERN = 'Lantern',
    MONEY_FACE = 'Money Face',
    PURSE = 'Purse',
}

export interface IPreferences {
    invites: InvitePreference;
    token: TokenPreference;
}

export class Preferences implements IPreferences {
    invites: InvitePreference;
    token: TokenPreference;

    static get blank(): Preferences {
        return {
            invites: InvitePreference.ANYONE,
            token: TokenPreference.MR_MONOPOLY,
        }
    }
}
