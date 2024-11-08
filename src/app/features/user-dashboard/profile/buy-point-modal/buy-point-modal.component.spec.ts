import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPointModalComponent } from './buy-point-modal.component';

describe('BuyPointModalComponent', () => {
  let component: BuyPointModalComponent;
  let fixture: ComponentFixture<BuyPointModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyPointModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPointModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
