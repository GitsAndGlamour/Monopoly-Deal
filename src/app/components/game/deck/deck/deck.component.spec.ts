import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeckComponent} from './deck.component';
import {PagesSpecModule} from '../../../../pages/pages.spec.module';

describe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PagesSpecModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
