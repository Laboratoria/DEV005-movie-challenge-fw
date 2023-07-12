import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'src/app/movie-api.service';
import { genres } from 'src/app/genres';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(
    private movieApiService: MovieApiService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.movieApiService.getMovieDetails().subscribe(
      (data: any) => {
        if (data?.results) {
          this.movies = data.results;
          this.filteredMovies = [...this.movies];
          this.orderMovies();
          this.getTopMovies();
        }
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
      this.filteredMovies = this.movies.filter(
        (movie: any) => movie.vote_average >= 7.5
      );
    } else if (this.selectedPopularity === 'top5') {
      this.filteredMovies = this.movies
        .filter((movie: any) => movie.vote_average >= 7.5)
        .slice(0, 5);
    } else {
      this.filteredMovies = this.movies;
    }
    this.orderMovies();
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
