import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export class Base {
    created: Date | Timestamp;

    get _created(): Date {
        return this.created instanceof Date ? this.created : this.created.toDate();
    }
}
