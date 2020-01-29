import {TestBed} from '@angular/core/testing';

import {ProfileService} from './profile.service';
import {ServiceSpecModule} from '../service.spec.module';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ServiceSpecModule]
  }));

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });
});
