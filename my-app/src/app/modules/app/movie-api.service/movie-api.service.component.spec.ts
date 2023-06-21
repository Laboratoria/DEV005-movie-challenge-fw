import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieApiServiceComponent } from './movie-api.service.component';

describe('MovieApiServiceComponent', () => {
  let component: MovieApiServiceComponent;
  let fixture: ComponentFixture<MovieApiServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieApiServiceComponent]
    });
    fixture = TestBed.createComponent(MovieApiServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
