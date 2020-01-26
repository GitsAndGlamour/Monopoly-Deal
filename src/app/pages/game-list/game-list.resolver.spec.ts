import { TestBed } from '@angular/core/testing';

import { GameListResolver } from './game-list.resolver';

describe('GameListResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameListResolver = TestBed.get(GameListResolver);
    expect(service).toBeTruthy();
  });
});
