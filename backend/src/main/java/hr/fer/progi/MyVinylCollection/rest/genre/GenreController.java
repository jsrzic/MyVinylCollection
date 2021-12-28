package hr.fer.progi.MyVinylCollection.rest.genre;

import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.Subgenre;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Secured({"ROLE_ADMIN", "ROLE_USER"})
@RequestMapping("/genres")
public class GenreController {

    @Autowired
    private GenreService genreService;

    @GetMapping("")
    public List<Genre> listGenres() { return genreService.listAll(); }

    @GetMapping("/getById")
    public List<Genre> getGenresById(@RequestBody List<Long> genreIds) {
        return genreService.getGenresById(genreIds);
    }

}
