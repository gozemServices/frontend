import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLanguageComponent } from './edit-language.component';

describe('EditLanguageComponent', () => {
  let component: EditLanguageComponent;
  let fixture: ComponentFixture<EditLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLanguageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
