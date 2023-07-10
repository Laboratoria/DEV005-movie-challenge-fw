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
  

  constructor(private movieApiService: MovieApiService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.movieApiService.getMovieDetails().subscribe(
      (data: any) => {
        this.movies = data.results;
        this.filteredMovies = [...this.movies];
        this.orderMovies();
        this.getTopMovies();
        //console.log(data.results);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  orderMovies() {
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

  movieGenero() {
    if (this.selectedGenre) {
      const x = this.movies.filter((movie: any) =>
        movie.genre_ids.includes(Number(this.selectedGenre))
      );
      console.log(x);
      this.filteredMovies = x;
    } else {
      this.filteredMovies = this.movies;
    }
    //console.log('Películas filtradas por género:', this.filteredMovies);
    this.orderMovies();
  }

  moviePopularity() {
    if (this.selectedPopularity === 'semana') {
      this.filteredMovies = this.movies.filter(
        (movie: any) => movie.vote_average >= 7.5
      );
    } else if (this.selectedPopularity === 'mes') {
      this.filteredMovies = this.movies
        .filter((movie: any) => movie.vote_average >= 7.5)
        .slice(0, 5);
    }
    this.orderMovies();
    //console.log('Películas filtradas por popularidad:', this.filteredMovies);
  }

  getTopMovies() {
    this.filteredMovies = this.movies;
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
    this.orderMovies();
  }  
}
