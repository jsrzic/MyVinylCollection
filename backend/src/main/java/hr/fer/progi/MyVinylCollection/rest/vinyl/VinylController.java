package hr.fer.progi.MyVinylCollection.rest.vinyl;


import hr.fer.progi.MyVinylCollection.domain.*;
import hr.fer.progi.MyVinylCollection.rest.security.VinylUserDetails;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.AddVinylDTO;
import hr.fer.progi.MyVinylCollection.service.ArtistService;
import hr.fer.progi.MyVinylCollection.service.GenreService;
import hr.fer.progi.MyVinylCollection.service.UserService;
import hr.fer.progi.MyVinylCollection.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/vinyls")
public class VinylController {

    @Autowired
    private VinylService vinylService;

    @Autowired
    private UserService userService;

    @Autowired
    private ArtistService artistService;

    @Autowired
    private GenreService genreService;

    @PostMapping("/{username}")
    public Vinyl addVinyl(@PathVariable("username") String username, @RequestBody AddVinylDTO vinylDto) {
        User user = userService.findByUsername(username);
        Artist artist = artistService.getArtistById(vinylDto.getArtistId());
        Genre genre = genreService.getGenreById(vinylDto.getGenreId());
        Subgenre subgenre = genreService.getSubgenreByName(vinylDto.getSubgenreName());
        Vinyl vinyl = new Vinyl(vinylDto,artist, genre, subgenre);
        return vinylService.addVinyl(vinyl, user);
    }
}
