import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(private http: HttpClient) { }

  getMovieDetails(movieId: number) {
    const apiKey = ' 0faa87df83a002d1bec6d1cfc722c670';
    const url = 'https://api.themoviedb.org/3/movie';
    return this.http.get(url);
  }
}