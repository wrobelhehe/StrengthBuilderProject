import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewFooterComponent } from './home-view-footer.component';

describe('HomeViewFooterComponent', () => {
  let component: HomeViewFooterComponent;
  let fixture: ComponentFixture<HomeViewFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeViewFooterComponent]
    });
    fixture = TestBed.createComponent(HomeViewFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
