import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicList } from './public-list';

describe('PublicList', () => {
  let component: PublicList;
  let fixture: ComponentFixture<PublicList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
