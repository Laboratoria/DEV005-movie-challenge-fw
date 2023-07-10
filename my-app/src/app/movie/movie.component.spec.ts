import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from './movie.component';
import { HttpClientModule } from '@angular/common/http';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieComponent],
      imports: [FormsModule, HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería actualizar movieTitle y llamar a buscarPeliculas()', () => {
    spyOn(component, 'buscarPeliculas');

    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'The Dark Knight';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.movieTitle).toBe('The Dark Knight');
    expect(component.buscarPeliculas).toHaveBeenCalled();
  });

  it('debería ocultar el input de búsqueda cuando se selecciona una película', () => {
    component.selectedMovie = 0;
    fixture.detectChanges();

    const inputContainer = fixture.nativeElement.querySelector('.input-container');
    expect(inputContainer.classList).toContain('hide-search');
  });
});
