import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  private apiKey = '0c4bcaa4795cb3ebcd4eca9cd315e08d';
    //private url = 'https://api.themoviedb.org/3/tv/popular';
    private url = 'https://api.themoviedb.org/3/discover/movie';
  constructor(private http: HttpClient) { }

  public getMovieDetails(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzRiY2FhNDc5NWNiM2ViY2Q0ZWNhOWNkMzE1ZTA4ZCIsInN1YiI6IjY0OTIyOWJmYmJlMWRkMDBhZDY5MzUyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.whgaFnE7q3QMk--91NxWUsPt1IDpKAwnwEr34tC-9-c'
    });
  
    // Añade los parámetros de consulta para obtener todas las películas
    const params = new HttpParams()
      .set('language', 'es') // Establece el idioma a español
      //.set('sort_by', 'popularity.desc'); // Ordena por popularidad descendente, puedes ajustar los criterios según tus necesidades
  
    return this.http.get<any>(this.url, { headers, params });
  }
  }