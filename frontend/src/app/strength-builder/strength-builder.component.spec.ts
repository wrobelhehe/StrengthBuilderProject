import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthBuilderComponent } from './strength-builder.component';

describe('StrengthBuilderComponent', () => {
  let component: StrengthBuilderComponent;
  let fixture: ComponentFixture<StrengthBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrengthBuilderComponent]
    });
    fixture = TestBed.createComponent(StrengthBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
