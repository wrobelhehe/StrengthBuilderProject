import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePlanComponent } from './generate-plan.component';

describe('GeneratePlanComponent', () => {
  let component: GeneratePlanComponent;
  let fixture: ComponentFixture<GeneratePlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratePlanComponent]
    });
    fixture = TestBed.createComponent(GeneratePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
