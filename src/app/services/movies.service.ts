import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl: string = 'http://www.omdbapi.com/?apikey=ab3e5af9'


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  searchMovies(searchTerm: string): Observable<any> {
    return this.http.get(baseUrl, { params: { s: searchTerm } });
  }


  searchMovieDetails(imdb: string): Observable<any> {
    return this.http.get(baseUrl, { params: { i: imdb } });
  }

}
