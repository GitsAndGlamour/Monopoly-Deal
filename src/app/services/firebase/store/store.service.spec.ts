import {TestBed} from '@angular/core/testing';

import {StoreService} from './store.service';
import {ServiceSpecModule} from '../../service.spec.module';

describe('StoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        ServiceSpecModule
    ]
  }));

  it('should be created', () => {
    const service: StoreService<object> = TestBed.get(StoreService);
    expect(service).toBeTruthy();
  });
});
