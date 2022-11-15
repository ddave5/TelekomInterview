import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getAllMovies() : Observable<Movie[]>{
    return this.http.get<Movie[]>(this.apiUrl + 'movies');
  }

  getCurrentMovie(id : number): Observable<Movie> {
    return this.http.get<Movie>(this.apiUrl + 'movie/' + id);
  }

  updateMovie(m: Movie): Observable<any>{
    const params = {...m};
    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json'
      })
    }
    return this.http.put(this.apiUrl + 'movie/edit/' + m.id, params, httpOptions);
  }

  deleteMovie(m: Movie): Observable<void> {
    return this.http.delete<void>(this.apiUrl + 'movie/delete/' + m.id);
  }

  saveMovie(m : Movie): Observable<any> {
    const params = {...m};
    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(this.apiUrl + 'movie/save', params, httpOptions);
  }
}
