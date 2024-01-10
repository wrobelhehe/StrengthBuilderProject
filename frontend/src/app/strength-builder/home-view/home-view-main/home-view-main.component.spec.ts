import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewMainComponent } from './home-view-main.component';

describe('HomeViewMainComponent', () => {
  let component: HomeViewMainComponent;
  let fixture: ComponentFixture<HomeViewMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeViewMainComponent]
    });
    fixture = TestBed.createComponent(HomeViewMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
