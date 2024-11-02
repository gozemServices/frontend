import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfosComponent } from './basic-infos.component';

describe('BasicInfosComponent', () => {
  let component: BasicInfosComponent;
  let fixture: ComponentFixture<BasicInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
