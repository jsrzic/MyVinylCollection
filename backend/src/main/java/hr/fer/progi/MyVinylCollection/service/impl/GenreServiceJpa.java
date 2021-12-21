package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.GenreRepository;
import hr.fer.progi.MyVinylCollection.dao.SubgenreRepository;
import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.Subgenre;
import hr.fer.progi.MyVinylCollection.service.GenreService;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class GenreServiceJpa implements GenreService {

    @Autowired
    private GenreRepository genreRepo;

    @Autowired
    private SubgenreRepository subgenreRepo;

    @Override
    public List<Genre> listAll() {
        return genreRepo.findAll();
    }

    @Override
    public Genre getGenreById(Long genreId) {
        return genreRepo.findById(genreId).orElseThrow(
                () -> new RequestDeniedException("No genre with id " + genreId)
        );

    }

    @Override
    public List<Genre> getGenresById(List<Long> genreIds) {
        return genreRepo.findByIdIn(genreIds);
    }

    @Override
    public List<Subgenre> listSubgenres(Long genreId) {
        return subgenreRepo.findByGenre(getGenresById(Collections.singletonList(genreId)).get(0));
    }

    @Override
    public Subgenre getSubgenreByName(String name) {
        return subgenreRepo.findByName(name);
    }

}