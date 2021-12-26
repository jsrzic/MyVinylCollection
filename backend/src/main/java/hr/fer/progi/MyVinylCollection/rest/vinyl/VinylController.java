package hr.fer.progi.MyVinylCollection.rest.vinyl;


import hr.fer.progi.MyVinylCollection.domain.*;
import hr.fer.progi.MyVinylCollection.rest.security.VinylUserDetails;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.AddVinylDTO;
import hr.fer.progi.MyVinylCollection.service.*;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.UpdateVinylDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/{username}/collection")
    public List<Vinyl> getVinylCollection(@PathVariable("username") String username) {
        User user = userService.findByUsername(username);
        return user.getVinyls();
    }

    @PostMapping("/{username}")
    public Vinyl addVinyl(@PathVariable("username") String username, @RequestBody AddVinylDTO vinylDto) {
        User user = userService.findByUsername(username);
        Artist artist = artistService.findById(vinylDto.getArtistId());
        Genre genre = genreService.getGenreById(vinylDto.getGenreId());
        Subgenre subgenre = genreService.getSubgenreById(vinylDto.getSubgenreId());
        Vinyl vinyl = new Vinyl(vinylDto, artist, genre, subgenre);
        return vinylService.addVinyl(vinyl, user);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> deleteVinyl(@PathVariable Long vinylId){
        if(vinylService.deleteVinyl(vinylId)){
            return new ResponseEntity<Object>(vinylId, HttpStatus.OK);
        }else{
            return new ResponseEntity<Object>(vinylId, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping("/{id}")
    public UpdateVinylDTO getVinylInfo(@PathVariable Long vinylId){
        try{
            return vinylService.getVinylInfo(vinylId);
        }catch(RequestDeniedException e){
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateVinylInfo(@PathVariable Long vinylId,
                                              @RequestBody UpdateVinylDTO updatedVinyl){
        if(vinylService.updateVinylInfo(vinylId, updatedVinyl)){
            return new ResponseEntity<Object>(vinylId, HttpStatus.OK);
        }else{
            return new ResponseEntity<Object>(vinylId, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("/{username}/subcollection/{id}")
    public ResponseEntity<Object> createSubcollection(@PathVariable("id") Long artistId,
                                                     @PathVariable("username") String username) {
        User user = userService.findByUsername(username);
        Artist artist = artistService.findById(artistId);
        vinylService.createSubcollection(artist, user);
        return new ResponseEntity<Object>(user, HttpStatus.OK);

    }

    @GetMapping("/{username}/subcollection")
    public List<Subcollection> getUserSubcollections(@PathVariable("username") String username) {
        User user = userService.findByUsername(username);
        List<Vinyl> collection = user.getVinyls();
        List<Subcollection> subcollections = new ArrayList<Subcollection>();
        user.getSubcollections().forEach( s -> {
            List<Vinyl> subcollectionItems =  collection.stream().filter(v -> v.getArtist().getName()
                    .equals(s.getName())).collect(Collectors.toList());
            subcollections.add(new Subcollection(s.getName(), subcollectionItems));
        });
        return subcollections;
    }

    @DeleteMapping("/{username}/subcollection/{id}")
    public ResponseEntity<Object> deleteSubcollection(@PathVariable("id") Long artistId,
                                                      @PathVariable("username") String username) {
        User user = userService.findByUsername(username);
        Artist artist = artistService.findById(artistId);
        vinylService.deleteSubcollection(artist, user);
        return new ResponseEntity<Object>(user, HttpStatus.OK);
    }




}
