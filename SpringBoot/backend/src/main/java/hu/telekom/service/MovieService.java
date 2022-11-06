package hu.telekom.service;

import hu.telekom.domain.Movie;

import java.util.List;

public interface MovieService {
    Movie saveMovie(Movie movie);
    Movie updateMovie(Movie movie);
    void deleteMovie(Movie movie);
    List<Movie> getMovies();
    Movie getMovieById(Long id);

}
