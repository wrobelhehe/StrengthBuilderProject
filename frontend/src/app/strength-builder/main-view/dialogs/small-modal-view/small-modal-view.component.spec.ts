import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallModalViewComponent } from './small-modal-view.component';

describe('SmallModalViewComponent', () => {
  let component: SmallModalViewComponent;
  let fixture: ComponentFixture<SmallModalViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallModalViewComponent]
    });
    fixture = TestBed.createComponent(SmallModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
