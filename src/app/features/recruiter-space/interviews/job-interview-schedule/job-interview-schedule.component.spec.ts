import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobInterviewScheduleComponent } from './job-interview-schedule.component';

describe('JobInterviewScheduleComponent', () => {
  let component: JobInterviewScheduleComponent;
  let fixture: ComponentFixture<JobInterviewScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobInterviewScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobInterviewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
