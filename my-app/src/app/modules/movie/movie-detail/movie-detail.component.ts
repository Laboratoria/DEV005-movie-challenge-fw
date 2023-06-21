import { Component } from '@angular/core';
import { MovieApiService } from 'src/app/movie-api.service'; 

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {
  constructor(private movieApiService: MovieApiService) { }

  getMovieDetails(movieId: number) {
    this.movieApiService.getMovieDetails(movieId)
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}