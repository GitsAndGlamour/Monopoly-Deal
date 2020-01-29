import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {ServiceSpecModule} from '../../service.spec.module';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ServiceSpecModule]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
