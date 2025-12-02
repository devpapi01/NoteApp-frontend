import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editnote } from './editnote';

describe('Editnote', () => {
  let component: Editnote;
  let fixture: ComponentFixture<Editnote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editnote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editnote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
