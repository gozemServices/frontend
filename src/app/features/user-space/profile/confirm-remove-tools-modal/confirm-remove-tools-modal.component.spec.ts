import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRemoveToolsModalComponent } from './confirm-remove-tools-modal.component';

describe('ConfirmRemoveToolsModalComponent', () => {
  let component: ConfirmRemoveToolsModalComponent;
  let fixture: ComponentFixture<ConfirmRemoveToolsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmRemoveToolsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmRemoveToolsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
