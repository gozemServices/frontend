import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanInterviewComponent } from './plan-interview.component';

describe('PlanInterviewComponent', () => {
  let component: PlanInterviewComponent;
  let fixture: ComponentFixture<PlanInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanInterviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
