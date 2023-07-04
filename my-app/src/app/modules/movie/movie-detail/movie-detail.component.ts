import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'src/app/movie-api.service';
import {genres} from 'src/app/genres';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})

export class MovieDetailComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  movieTitle: string = '';
  orderBy: string = '';
  selectedGenre: number = 0;
  selectedPopularity: string = '';
  genreMap: any = genres;

  constructor(private movieApiService: MovieApiService) {}

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.movieApiService.getMovieDetails().subscribe(
      (data: any) => {
        this.filteredMovies = data.results;
        this.orderMovies();
        console.log(this.filteredMovies);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  orderMovies(){
    if(this.orderBy === 'asc'){
      this.filteredMovies = this.filteredMovies.sort((a, b) =>
      a.title.localeCompare(b.title)
      );
    }else if(this.orderBy === 'desc'){
      this.filteredMovies = this.filteredMovies.sort((a,b) =>
      b.title.localeCompare(a.title)
      );
    }
  }

  movieGenero(){
    if(this.selectedGenre){
      this.filteredMovies = this.filteredMovies.filter((movie: any) =>
      movie.genre_ids.indexOf(this.selectedGenre) >= 0
      );
    }else{
      this.filteredMovies = this.movies;
    }
    console.log('Películas filtradas por genero:', this.filteredMovies);
    this.orderMovies();
  }

  moviePopularity() {
    if (this.selectedPopularity === 'semana') {
      // Filtrar películas por popularidad de la semana
      this.filteredMovies = this.filteredMovies.filter((movie: any) =>
        movie.popularity >= 50.0 // Supongamos que una película es popular si su valor de popularidad es mayor o igual a 50
      );
    } else if (this.selectedPopularity === 'mes') {
      // Filtrar películas por popularidad del mes
      this.filteredMovies = this.filteredMovies.filter((movie: any) =>
        movie.popularity >= 30.0 // Supongamos que una película es popular si su valor de popularidad es mayor o igual a 30
      );
    } else if (this.selectedPopularity === 'todos') {
      // Mostrar todas las películas sin filtrar por popularidad
      this.filteredMovies = this.movies;
    }
    this.orderMovies();
    console.log('Peliculas filtradas por popularidad:', this.filteredMovies);
    
  }

  buscarPeliculas() {
    const searchTerm = this.movieTitle.toLocaleLowerCase();
    this.filteredMovies = this.movies.filter((movie: any) =>
    movie.title.toLowerCase().includes(searchTerm)
    );
  }

getGenreName(genreId: number): string {
  const genre = this.genreMap.find((g: any) => g.id === genreId);
  return genre ? genre.name : '';
}
}