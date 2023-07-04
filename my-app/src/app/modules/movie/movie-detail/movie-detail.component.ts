import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'src/app/movie-api.service';
import { genres } from 'src/app/genres';

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
  selectedGenre: number | null = null;
  selectedPopularity: string = '';
  genreMap: any = genres;
  topMovies: any[] = [];

  
  constructor(private movieApiService: MovieApiService) {}

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.movieApiService.getMovieDetails().subscribe(
      (data: any) => {
        this.movies = data.results;
        this.filteredMovies = this.movies;
        this.orderMovies();
        this.getTopMovies();
        console.log(data.results);
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
        //console.log(movie.title, movie.genre_ids, Number(this.selectedGenre), movie.genre_ids.includes(Number(this.selectedGenre)))

        movie.genre_ids.includes(Number(this.selectedGenre))
        //return true
      
        
      );
      console.log(x)
      this.filteredMovies = x;
    } else {
      this.filteredMovies = this.movies;
    }
    console.log('Películas filtradas por género:', this.filteredMovies);
    this.orderMovies();
  }

moviePopularity() {
  if (this.selectedPopularity === 'semana') {
    this.filteredMovies = this.movies.filter((movie: any) =>
      movie.popularity >= 1200.000
    )
  } else if (this.selectedPopularity === 'mes') {
    this.filteredMovies = this.movies.filter((movie: any) =>
      movie.popularity >= 1200.000
    ).slice(0, 5);
  }
  this.orderMovies();
  console.log('Películas filtradas por popularidad:', this.filteredMovies);
}

getTopMovies() {
  this.filteredMovies = this.movies.slice(0, 5);
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
