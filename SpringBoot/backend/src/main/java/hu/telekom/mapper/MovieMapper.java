package hu.telekom.mapper;

import hu.telekom.domain.Movie;
import hu.telekom.dto.MovieCreateRequest;
import hu.telekom.dto.MovieCreateResponse;
import hu.telekom.dto.MovieEditRequest;
import hu.telekom.dto.MovieEditResponse;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MovieMapper {

    MovieMapper INSTANCE = Mappers.getMapper( MovieMapper.class );

    MovieCreateResponse mapToCreateResponse(Movie movie);
    Movie mapToCreateEntity(MovieCreateRequest movieCreateRequest);

    MovieEditResponse mapToEditResponse(Movie movie);
    Movie mapToEditEntity(MovieEditRequest movieEditRequest);
}
