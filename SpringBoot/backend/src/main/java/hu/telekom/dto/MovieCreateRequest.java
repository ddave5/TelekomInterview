package hu.telekom.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

@Getter
@Setter
public class MovieCreateRequest {

    @Size(min = 1, max = 255, message = "A cím hossza nem megfelelő")
    private String title;

    @Size(min = 1, max = 4096, message = "A leírás hossza nem megfelelő")
    private String description;

    @Min(value = 1900, message = "Az év nem lehet korábbi, mint 1900")
    @Max(value = 2023, message = "Az év nem lehet több, mint 2023")
    private Integer date;

    @Size(min = 1, max = 4096, message = "Az URL hossza nem megfelelő")
    private String url;
}
