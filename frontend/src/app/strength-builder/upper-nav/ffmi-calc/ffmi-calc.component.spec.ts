import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfmiCalcComponent } from './ffmi-calc.component';

describe('FfmiCalcComponent', () => {
  let component: FfmiCalcComponent;
  let fixture: ComponentFixture<FfmiCalcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FfmiCalcComponent]
    });
    fixture = TestBed.createComponent(FfmiCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
