package hu.telekom.exception;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({ ValidationException.class, MethodArgumentNotValidException.class, IllegalArgumentException.class })
    public final ResponseEntity<ErrorMessage> handleException(Exception ex, WebRequest request) {
        ErrorMessage em = new ErrorMessage(Error.GENERAL_ERROR, ex.getMessage());
        if(ex instanceof MethodArgumentNotValidException) {
            String hibaLista =
                    ((MethodArgumentNotValidException) ex)
                            .getBindingResult()
                            .getAllErrors()
                            .stream()
                            .map(DefaultMessageSourceResolvable::getDefaultMessage)
                            .collect(Collectors.joining(", "));
            em = new ErrorMessage(Error.VALIDATION_ERROR, hibaLista);

        } else if (ex instanceof IllegalArgumentException) {
            em = new ErrorMessage(Error.ILLEGAL_ARGUMENT_ERROR, ex.getMessage());
        }
        return new ResponseEntity<>(em, HttpStatus.BAD_REQUEST);
    }
}
