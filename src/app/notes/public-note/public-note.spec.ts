import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNote } from './public-note';

describe('PublicNote', () => {
  let component: PublicNote;
  let fixture: ComponentFixture<PublicNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicNote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicNote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
