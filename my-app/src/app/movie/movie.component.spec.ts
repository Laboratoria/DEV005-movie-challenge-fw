import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from './movie.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieApiService } from 'src/app/movie-api.service';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [MovieApiService],
    }).compileComponents();
  });

  beforeEach(() => {
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

  // Test para mi función de filtrado por género
  it('debería filtrar las películas por género cuando se selecciona un género', () => {
    const mockMovies = [
      { title: 'Película 1', genre_ids: [28] },
      { title: 'Película 2', genre_ids: [35] },
      { title: 'Película 3', genre_ids: [28, 35] },
    ];

    component.movies = mockMovies;
    component.selectedGenre = 28;

    component.movieGenero();

    expect(component.filteredMovies.length).toBe(2);
    expect(component.filteredMovies[0].title).toBe('Película 1');
    expect(component.filteredMovies[1].title).toBe('Película 3');
  });

  it('debería restablecer el filtro de películas cuando no se selecciona ningún género', () => {
    const mockMovies = [
      { title: 'Película 1', genre_ids: [28] },
      { title: 'Película 2', genre_ids: [35] },
    ];

    component.movies = mockMovies;
    component.selectedGenre = 28;

    component.movieGenero();
    expect(component.filteredMovies.length).toBe(1);

    component.selectedGenre = null;
    component.movieGenero();
    expect(component.filteredMovies.length).toBe(2);
  });

   // Test para mi función de filtrado por top más populares y top 5
   it('debería filtrar las películas por más populares cuando se selecciona populares', () => {
    const mockMovies = [
      { selectedPopularity: 'semana', vote_average: 7.5 },
      { selectedPopularity: 'mes', vote_average: 7.5 },
    ];

    component.movies = mockMovies;
    component.selectedPopularity = 'semana';

    component.moviePopularity();

    expect(component.filteredMovies.length).toBe(2);
    expect(component.filteredMovies[0].selectedPopularity).toBe('semana');
    expect(component.filteredMovies[1].selectedPopularity).toBe('mes');
  });

  // Testeando la funcion de ordenar peliculas ascendentey descendente 

  it('debería ordenar las películas en orden ascendente por título', () => {
    const mockMovies = [
      { title: 'Película B' },
      { title: 'Película A' },
      { title: 'Película C' }
    ];
  
    component.filteredMovies = mockMovies;
    component.orderBy = 'asc';
  
    component.orderMovies();
  
    expect(component.filteredMovies.length).toBe(3);
    expect(component.filteredMovies[0].title).toBe('Película A');
    expect(component.filteredMovies[1].title).toBe('Película B');
    expect(component.filteredMovies[2].title).toBe('Película C');
  });
  
  it('debería ordenar las películas en orden descendente por título', () => {
    const mockMovies = [
      { title: 'Película B' },
      { title: 'Película A' },
      { title: 'Película C' }
    ];
  
    component.filteredMovies = mockMovies;
    component.orderBy = 'desc';
  
    component.orderMovies();
  
    expect(component.filteredMovies.length).toBe(3);
    expect(component.filteredMovies[0].title).toBe('Película C');
    expect(component.filteredMovies[1].title).toBe('Película B');
    expect(component.filteredMovies[2].title).toBe('Película A');
  });
  
  // Test de boton de Inicio
  it('debería restablecer las variables y filtros al hacer clic en el botón de inicio', () => {
    const mockMovies = [
      { title: 'Película 1' },
      { title: 'Película 2' },
      { title: 'Película 3' }
    ];
  
    component.movies = mockMovies;
    component.filteredMovies = mockMovies;
    component.orderBy = 'desc';
    component.selectedGenre = 28;
    component.selectedPopularity = 'mes';
    component.selectedMovie = 1;
    component.selectedMovieIndex = 1;
    component.moviePoster = 'poster-url';
  
    component.home();
  
    expect(component.selectedMovie).toBeNull();
    expect(component.selectedMovieIndex).toBeNull();
    expect(component.moviePoster).toBeNull();
    expect(component.filteredMovies).toEqual(mockMovies);
    expect(component.orderBy).toBe('');
    expect(component.selectedGenre).toBeNull();
    expect(component.selectedPopularity).toBe('');
  });
  
});
