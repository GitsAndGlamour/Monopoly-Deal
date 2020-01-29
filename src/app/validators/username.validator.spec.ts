import {TestBed} from '@angular/core/testing';
import {UsernameValidator} from './username.validator';
import {ValidatorSpecModule} from './validator.spec.module';
import {ProfileService} from '../services/profile/profile.service';
import {of} from 'rxjs';

describe('UsernameValidator', () => {
    let validator: UsernameValidator;
    let profileService: ProfileService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ValidatorSpecModule
            ],
            providers: []
        });
        profileService = TestBed.get(ProfileService);
        validator = TestBed.get(UsernameValidator);
    });

    it('should be created', () => {
        expect(validator).toBeTruthy();
    });

    it('should return custom error if username is taken', (done: DoneFn) => {
        const spy =
            jasmine.createSpyObj('ProfileService', ['usernameExists']);

        const stubValue = of(true).toPromise();
        spy.usernameExists.and.returnValue(stubValue);
        spyOn(profileService, 'usernameExists');
        expect(profileService.usernameExists).not.toHaveBeenCalled();

        validator = new UsernameValidator(spy);

        validator.searchUsername('test').subscribe(value => {
            expect(value).toBeTruthy();
            done();
        });
    });

    it('should return nothing if username is not taken', (done: DoneFn) => {
        const spy =
            jasmine.createSpyObj('ProfileService', ['usernameExists']);

        const stubValue = of(false).toPromise();
        spy.usernameExists.and.returnValue(stubValue);
        spyOn(profileService, 'usernameExists');
        expect(profileService.usernameExists).not.toHaveBeenCalled();

        validator = new UsernameValidator(spy);

        validator.searchUsername('test').subscribe(value => {
            expect(value).toBeFalsy();
            done();
        });
    });
});
