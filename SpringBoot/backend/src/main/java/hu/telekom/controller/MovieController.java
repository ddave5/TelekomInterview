package hu.telekom.controller;

import hu.telekom.domain.Movie;
import hu.telekom.dto.MovieCreateRequest;
import hu.telekom.dto.MovieCreateResponse;
import hu.telekom.dto.MovieEditRequest;
import hu.telekom.dto.MovieEditResponse;
import hu.telekom.mapper.MovieMapper;
import hu.telekom.service.MovieServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
@Slf4j
public class MovieController {

    @Autowired
    MovieServiceImpl movieService;

    @GetMapping("/movies")
    public ResponseEntity<List<Movie>> getMovies() {
        log.info("Sending all movies");
        return ResponseEntity.ok().body(movieService.getMovies());
    }

    @GetMapping("/movie/{movieId}")
    public Movie getMovie(@PathVariable("movieId") Long movieId) {
        log.info("Sending movie with id {}", movieId);
        return movieService.getMovieById(movieId);
    }

    @PostMapping("/movie/save")
    public ResponseEntity<MovieCreateResponse> saveMovie(@RequestBody @Valid MovieCreateRequest movie) {
        Movie savedMovie = movieService.saveMovie(MovieMapper.INSTANCE.mapToCreateEntity(movie));
        log.info("Successful saved movie with id {}", savedMovie.getId());
        return new ResponseEntity<>(MovieMapper.INSTANCE.mapToCreateResponse(savedMovie), HttpStatus.OK);
    }

    @DeleteMapping("/movie/delete/{movieId}")
    public void deleteMovie(@PathVariable("movieId") Long movieId){
        log.info("Successful saved movie with id {}", movieId);
        movieService.deleteMovie(movieService.getMovieById(movieId));
    }

    @PutMapping(path = "/movie/edit/{movieId}")
    public ResponseEntity<MovieEditResponse> updateMovie(@PathVariable("movieId") Long movieId, @RequestBody MovieEditRequest movie) {
        Movie updatedMovie = movieService.updateMovie(MovieMapper.INSTANCE.mapToEditEntity(movie));
        log.info("Successful updated movie with id {}", updatedMovie.getId());
        return new ResponseEntity<>(MovieMapper.INSTANCE.mapToEditResponse(updatedMovie), HttpStatus.OK);
    }

}
