import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GameRulesComponent} from './game-rules.component';
import {PagesSpecModule} from '../pages.spec.module';

describe('GameRulesComponent', () => {
  let component: GameRulesComponent;
  let fixture: ComponentFixture<GameRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PagesSpecModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
