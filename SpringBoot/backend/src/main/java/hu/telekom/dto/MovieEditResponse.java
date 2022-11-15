package hu.telekom.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MovieEditResponse {

    private Long id;
    private String title;
    private String description;
    private Integer date;
    private String url;
}
