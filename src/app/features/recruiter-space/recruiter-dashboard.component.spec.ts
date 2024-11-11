import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterDashboardComponent } from './recruiter-space.component';

describe('RecruiterDashboardComponent', () => {
  let component: RecruiterDashboardComponent;
  let fixture: ComponentFixture<RecruiterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
