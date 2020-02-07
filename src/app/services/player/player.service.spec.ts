import {TestBed} from '@angular/core/testing';

import {PlayerService} from './profile.service';
import {ServiceSpecModule} from '../service.spec.module';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ServiceSpecModule]
  }));

  it('should be created', () => {
    const service: PlayerService = TestBed.get(PlayerService);
    expect(service).toBeTruthy();
  });
});
