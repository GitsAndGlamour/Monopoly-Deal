import {TestBed} from '@angular/core/testing';

import {GameService} from './game.service';
import {ServiceSpecModule} from '../service.spec.module';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ServiceSpecModule]
  }));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });
});
