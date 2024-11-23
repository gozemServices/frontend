import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGeneralInfosComponent } from './edit-general-infos.component';

describe('EditGeneralInfosComponent', () => {
  let component: EditGeneralInfosComponent;
  let fixture: ComponentFixture<EditGeneralInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGeneralInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGeneralInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
