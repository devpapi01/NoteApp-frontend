import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listenotes } from './listenotes';

describe('Listenotes', () => {
  let component: Listenotes;
  let fixture: ComponentFixture<Listenotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listenotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listenotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
