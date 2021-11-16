package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.GenreRepository;
import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreServiceJpa implements GenreService {

    @Autowired
    private GenreRepository genreRepo;

    @Override
    public List<Genre> listAll() {
        return genreRepo.findAll();
    }

    @Override
    public List<Genre> getGenresById(List<Long> genreIds) { return genreRepo.findByIdIn(genreIds); }
}
