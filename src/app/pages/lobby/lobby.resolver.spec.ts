import {TestBed} from '@angular/core/testing';

import {ProfileResolver} from '../../resolvers/lobby.resolver';
import {AngularFirestore} from '@angular/fire/firestore';
import {ServiceSpecModule} from '../../services/service.spec.module';

describe('ProfileResolver', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [ServiceSpecModule],
    }));

    it('should be created', () => {
        const service: ProfileResolver = TestBed.get(ProfileResolver);
        expect(service).toBeTruthy();
    });

    it('should sign out when signOut is called', () => {
        expect(true).toBeTruthy(); // TODO: Provide test for signOut
    })
});
