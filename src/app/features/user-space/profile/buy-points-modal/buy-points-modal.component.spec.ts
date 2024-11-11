import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPointsModalComponent } from './buy-points-modal.component';

describe('BuyPointsModalComponent', () => {
  let component: BuyPointsModalComponent;
  let fixture: ComponentFixture<BuyPointsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyPointsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPointsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
