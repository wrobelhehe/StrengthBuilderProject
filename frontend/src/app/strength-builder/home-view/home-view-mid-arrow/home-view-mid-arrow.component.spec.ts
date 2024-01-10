import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewMidArrowComponent } from './home-view-mid-arrow.component';

describe('HomeViewMidArrowComponent', () => {
  let component: HomeViewMidArrowComponent;
  let fixture: ComponentFixture<HomeViewMidArrowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeViewMidArrowComponent]
    });
    fixture = TestBed.createComponent(HomeViewMidArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
