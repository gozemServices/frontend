import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayingToolsComponent } from './paying-tools.component';

describe('PayingToolsComponent', () => {
  let component: PayingToolsComponent;
  let fixture: ComponentFixture<PayingToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayingToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayingToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
