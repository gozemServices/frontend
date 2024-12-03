import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareItemComponent } from './share-item.component';

describe('ShareJobComponent', () => {
  let component: ShareItemComponent;
  let fixture: ComponentFixture<ShareItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
