package hu.telekom.exception;

import lombok.Getter;

@Getter
public class ValidationException extends RuntimeException{

    private String errorMessage;

    public ValidationException() {
        super();
    }

    public ValidationException(String message) {
        super(message);
        errorMessage = message;
    }

    public ValidationException(String message, Throwable cause) {
        super(message, cause);
        errorMessage = message;
    }

    public ValidationException(Throwable cause) {
        super(cause);
    }
}
