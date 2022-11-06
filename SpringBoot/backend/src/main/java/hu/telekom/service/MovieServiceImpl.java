package hu.telekom.service;

import hu.telekom.domain.Movie;
import hu.telekom.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;

    @Override
    public Movie saveMovie(Movie movie) {
        log.info("Save movie with id {}", movie.getId());
        return movieRepository.save(movie);
    }

    @Override
    public Movie updateMovie(Movie movie) {
        log.info("Update movie with id {}", movie.getId());
        return movieRepository.saveAndFlush(movie);
    }

    @Override
    public void deleteMovie(Movie movie) {
        log.info("Delete movie with id {}", movie.getId());
        movieRepository.delete(movie);
    }

    @Override
    public List<Movie> getMovies() {
        log.info("Get all movies");
        return movieRepository.findAll();
    }

    @Override
    public Movie getMovieById(Long id) {
        Optional<Movie> movieOptional = movieRepository.findById(id);
        log.info("Fetching movie with id {}", id);
        return movieOptional.orElseThrow(
                () -> new IllegalArgumentException(("Movie with id: " + id + " does not exists.")));
    }
}
