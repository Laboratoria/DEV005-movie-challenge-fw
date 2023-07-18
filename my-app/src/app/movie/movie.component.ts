import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'src/app/movie-api.service';
import { genres } from 'src/app/genres';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  movieTitle: string = '';
  orderBy: string = '';
  selectedGenre: number | null = null;
  selectedPopularity: string = '';
  genreMap: any = genres;
  topMovies: any[] = [];
  selectedMovie: number | null = null;
  moviePoster: string | null = null;
  selectedMovieIndex: number | null = null;
  showOrderOption: boolean = true;
  showSearchContainer: boolean = false;


  constructor(
    private movieApiService: MovieApiService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.orderBy = ''; 
    this.selectedGenre = null;
    this.selectedPopularity = '';
    this.llenarData();
  }

  toggleSearchContainer() {
    this.showSearchContainer = !this.showSearchContainer;
  
    // Si el contenedor de búsqueda está visible, mueve el focus al campo de búsqueda
    if (this.showSearchContainer) {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.focus();
      }
    }
  }
  

  llenarData() {
    
      const totalPages = 10;
      const requests: Observable<any>[] = [];

      for (let page = 1; page <= totalPages; page++){
        const params = new HttpParams()
        .set('language' , 'es')
        .set('page' , page.toString())
        
        requests.push(this.movieApiService.getMovieDetails(params));
      }
       forkJoin(requests).subscribe(
        (responses: any[]) => {
          this.filteredMovies = responses.flatMap((response: any) => response.results);
          this.movies = [...this.filteredMovies];
          this.orderMovies();
          this.getTopMovies();
          console.log(this.filteredMovies);
        },
      (error: any) => {
        console.error(error);
      }
    );
  }

  orderMovies() {
    if (this.filteredMovies && this.filteredMovies.length > 0) {
      if (this.orderBy === 'asc') {
        this.filteredMovies = this.filteredMovies.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      } else if (this.orderBy === 'desc') {
        this.filteredMovies = this.filteredMovies.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      }
    }
  }
  

  movieGenero() {
    if (this.selectedGenre) {
      const filterGenre = this.movies.filter((movie: any) =>
        movie.genre_ids.includes(Number(this.selectedGenre))
      );
      this.filteredMovies = filterGenre;
    } else {
      this.filteredMovies = this.movies;
    }
    this.orderMovies();
  }

  moviePopularity() {
    if (this.selectedPopularity === 'populares') {
      this.filteredMovies = this.movies
      .filter((movie: any) => movie.vote_average >= 7.5)
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 30);
    
    } else if (this.selectedPopularity === 'top10') {
      this.filteredMovies = this.movies
        .filter((movie: any) => movie.vote_average >= 7.5)
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 10);
    } else {
      this.filteredMovies = this.movies;
    }
    this.orderMovies();
    console.log(this.filteredMovies);
    
  }

  getTopMovies() {
    this.topMovies = this.movies
      .filter((movie: any) => movie.vote_average >= 7.5)
      .slice(0, 5);
  }

  buscarPeliculas() {
    const searchTerm = this.movieTitle.toLowerCase();
    this.filteredMovies = this.movies.filter((movie: any) =>
      movie.title.toLowerCase().includes(searchTerm)
      
    );
  }

  getGenreName(genreId: number): string {
    const genre = this.genreMap.find((g: any) => g.id === genreId);
    return genre ? genre.name : '';
  }

  movieIndex(index: number) {
    if (this.selectedMovie === index) {
      this.selectedMovie = null;
      this.selectedMovieIndex = null;
      this.moviePoster = null;
    } else {
      this.selectedMovie = index;
      this.selectedMovieIndex = index;
      this.moviePoster =
        'https://image.tmdb.org/t/p/w500' +
        this.filteredMovies[index].poster_path;
    }
  }
  

  home() {
    this.selectedMovie = null;
    this.selectedMovieIndex = null;
    this.moviePoster = null;
    this.filteredMovies = [...this.movies];
    this.orderBy = ''; // Restablecer el valor de orderBy
    this.selectedGenre = null; // Restablecer el valor de selectedGenre
    this.selectedPopularity = ''; // Restablecer el valor de selectedPopularity
    this.orderMovies();
  }
}
