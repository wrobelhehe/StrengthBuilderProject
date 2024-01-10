import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesCalcComponent } from './calories-calc.component';

describe('CaloriesCalcComponent', () => {
  let component: CaloriesCalcComponent;
  let fixture: ComponentFixture<CaloriesCalcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaloriesCalcComponent]
    });
    fixture = TestBed.createComponent(CaloriesCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
