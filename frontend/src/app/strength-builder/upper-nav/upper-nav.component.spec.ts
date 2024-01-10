import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewUpperNavComponent } from './upper-nav.component';

describe('HomeViewUpperNavComponent', () => {
  let component: HomeViewUpperNavComponent;
  let fixture: ComponentFixture<HomeViewUpperNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeViewUpperNavComponent]
    });
    fixture = TestBed.createComponent(HomeViewUpperNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
