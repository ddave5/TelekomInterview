import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  isLoading = true;

  constructor(private movieService: MovieService, private router : Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() : void {
    this.movieService.getAllMovies().subscribe( (data) => {
      this.movies = data;
      this.isLoading = false;
    });
  }

  onEdit(movie: Movie) : void {
    this.router.navigateByUrl('movie/' + movie.id);
  }

  onDelete(movie: Movie) : void {
    if(confirm("Biztos, hogy törölni akarod a(z) " + movie.title + " című filmet?")) {
      this.movieService.deleteMovie(movie).subscribe(
        () => {this.fetchData()},
        (err) => console.log(err)
      );
      this.movies.filter( item => item.id != movie.id);
    }
  }

}
