import { TestBed } from '@angular/core/testing';

import { ProfileResolver } from './lobby.resolver';

describe('ProfileResolver', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ProfileResolver = TestBed.get(ProfileResolver);
        expect(service).toBeTruthy();
    });

    it('should sign out when signOut is called', () => {
        expect(true).toBeTruthy(); // TODO: Provide test for signOut
    })
});
