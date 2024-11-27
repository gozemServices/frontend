import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskDeleteConfirmationComponent } from './ask-delete-confirmation.component';

describe('AskDeleteConfirmationComponent', () => {
  let component: AskDeleteConfirmationComponent;
  let fixture: ComponentFixture<AskDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskDeleteConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
