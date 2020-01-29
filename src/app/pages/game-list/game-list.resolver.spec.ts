import {TestBed} from '@angular/core/testing';

import {GameListResolver} from './game-list.resolver';
import {ServiceSpecModule} from '../../services/service.spec.module';

describe('GameListResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ServiceSpecModule]
  }));

  it('should be created', () => {
    const service: GameListResolver = TestBed.get(GameListResolver);
    expect(service).toBeTruthy();
  });
});
