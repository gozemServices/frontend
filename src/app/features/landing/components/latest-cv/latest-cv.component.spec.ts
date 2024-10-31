import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestCvComponent } from './latest-cv.component';

describe('LatestCvComponent', () => {
  let component: LatestCvComponent;
  let fixture: ComponentFixture<LatestCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestCvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
