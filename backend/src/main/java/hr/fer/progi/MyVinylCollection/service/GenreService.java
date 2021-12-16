package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.Genre;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface GenreService {

    List<Genre> listAll();
    List<Genre> getGenresById(List<Long> genreIds);
}
