import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewNavComponent } from './home-view-nav.component';

describe('HomeViewNavComponent', () => {
  let component: HomeViewNavComponent;
  let fixture: ComponentFixture<HomeViewNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeViewNavComponent]
    });
    fixture = TestBed.createComponent(HomeViewNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
