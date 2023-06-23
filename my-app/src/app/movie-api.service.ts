import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(private http: HttpClient) { }

  getMovieDetails(movieId: number) {
    const apiKey = '0c4bcaa4795cb3ebcd4eca9cd315e08d';
    const url = 'https://api.themoviedb.org/3/tv/popular';
    return this.http.get(url);
  }
}