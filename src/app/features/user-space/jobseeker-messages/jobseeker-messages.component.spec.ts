import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerMessagesComponent } from './jobseeker-messages.component';

describe('JobseekerMessagesComponent', () => {
  let component: JobseekerMessagesComponent;
  let fixture: ComponentFixture<JobseekerMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobseekerMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobseekerMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
