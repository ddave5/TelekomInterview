package hu.telekom.controller;

import hu.telekom.domain.Movie;
import hu.telekom.service.MovieServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
@Slf4j
public class HomeController {

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
    public ResponseEntity<String> saveMovie(@RequestBody Movie movie) {
        if(!validMovie(movie).isEmpty()) {
            return new ResponseEntity<>(validMovie(movie), HttpStatus.BAD_REQUEST);
        }
        movieService.saveMovie(movie);
        log.info("Successful saved movie with id {}", movie.getId());
        return new ResponseEntity<>("Sikeres adatmentés!", HttpStatus.OK);
    }

    @DeleteMapping("/movie/delete/{movieId}")
    public void deleteMovie(@PathVariable("movieId") Long movieId){
        log.info("Successful saved movie with id {}", movieId);
        movieService.deleteMovie(movieService.getMovieById(movieId));
    }

    @PutMapping(path = "/movie/edit")
    public ResponseEntity<String> updateMovie(@RequestBody Movie movie) {
        if(!validMovie(movie).isEmpty()) {
            return new ResponseEntity<>(validMovie(movie), HttpStatus.BAD_REQUEST);
        }
        movieService.updateMovie(movie);
        log.info("Successful updated movie with id {}", movie.getId());
        return new ResponseEntity<>("Sikeres adatmentés!", HttpStatus.OK);
    }

    private String validMovie(Movie movie) {
        if (movie.getDate() < 1900 || movie.getDate() > Calendar.getInstance().get(Calendar.YEAR)) {
            log.error("Not a valid date");
            return "Az évszám nem megfelelő";
        }
        if (movie.getTitle().length() > 255) {
            log.error("Title is too long!");
            return "Az cím túl hosszú";
        }
        if (movie.getDescription().length() > 4096) {
            log.error("Description is too long!");
            return "A leírás túl hosszú!";
        }
        if (movie.getUrl().length() > 4096) {
            log.error("URL is too long!");
            return "A kép URL-je túl hosszú!";
        }

        return "";
    }

}
