import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateInterviewFeedbackComponent } from './candidate-interview-feedback.component';

describe('CandidateInterviewFeedbackComponent', () => {
  let component: CandidateInterviewFeedbackComponent;
  let fixture: ComponentFixture<CandidateInterviewFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateInterviewFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateInterviewFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
