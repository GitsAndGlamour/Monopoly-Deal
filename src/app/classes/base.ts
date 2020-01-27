import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface IBase {
    created: Date | Timestamp;
}

export class Base {
    created: Date | Timestamp;

    constructor({created}) {
        this.created = created;
    }

    get _created(): Date {
        return this.created instanceof Date ? this.created : this.created.toDate();
    }
}
