import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'src/app/movie-api.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  movieTitle: string = '';

  constructor(private movieApiService: MovieApiService) {}

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.movieApiService.getMovieDetails().subscribe(
      (data: any) => {
        this.movies = data.results;
        this.filteredMovies = this.movies;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  buscarPeliculas() {
    const searchTerm = this.movieTitle.toLocaleLowerCase();
    this.filteredMovies = this.movies.filter((movie: any) =>
    movie.title.toLowerCase().includes(searchTerm)
    );
  }
}