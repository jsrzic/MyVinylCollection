package hr.fer.progi.MyVinylCollection.rest.user;

import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.mapper.MapStructMapper;
import hr.fer.progi.MyVinylCollection.rest.security.VinylUserDetails;
import hr.fer.progi.MyVinylCollection.rest.security.VinylUserDetailsService;
import hr.fer.progi.MyVinylCollection.rest.user.dto.LoginUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.UpdateUserDTO;
import hr.fer.progi.MyVinylCollection.service.GenreService;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import hr.fer.progi.MyVinylCollection.service.UserService;
import hr.fer.progi.MyVinylCollection.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private VinylService vinylService;

    @Autowired
    private GenreService genreService;

    @Autowired
    private VinylUserDetailsService userDetailsService;

    @GetMapping("")
    public List<User> listUsers() {
        return userService.listAll();
    }

    private Cookie createCookie(String username) {
        Cookie cookie = new Cookie("username",username);

        cookie.setMaxAge(7 * 24 * 60 * 60);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

       return cookie;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody RegisterUserDTO user, HttpServletResponse response) {
        if (userService.checkUsernameUnique(user)) {
            List<Genre> userGenrePreference = genreService.getGenresById(user.getPreferredGenres());
            return userService.registerUser(user, userGenrePreference);
        } else {
            throw new IllegalArgumentException("Username already exists.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody LoginUserDTO user, HttpServletResponse response) {
        response.addCookie(createCookie(user.getUsername()));
        if (userService.checkUsernameExists(user) && userService.checkPassword(user)) {
            userDetailsService.loadUserByUsername(user.getUsername());
            return new ResponseEntity<Object>(user, HttpStatus.OK);
        } else {
            throw new IllegalArgumentException("Invalid username/password.");
        }
    }

    @GetMapping("/contact_email/{id}")
    public String getUserContactEmail(@PathVariable("id") Long userId){
        try{
            String contactEmail = userService.getUserContactEmail(userId);
            return contactEmail;
        }catch(RequestDeniedException e){
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @PostMapping("/status/{id}")
    public ResponseEntity<Object> updateUserStatus(@PathVariable("id") Long userId, @RequestParam boolean status){
        try{
            if(userService.updateUserStatus(userId, status)){
                return new ResponseEntity<Object>(userId, HttpStatus.OK);
            }else{
                return new ResponseEntity<Object>(userId, HttpStatus.EXPECTATION_FAILED);
            }
        }catch(RequestDeniedException e){
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @GetMapping("/info/{username}")
    public UpdateUserDTO getUserInfo(@PathVariable("username") String username){
        try{
            return userService.getUserInfo(username);
        }catch(RequestDeniedException e){
            throw new IllegalArgumentException(e.getMessage());
        }

    }

    @PutMapping("/info/{username}")
    public ResponseEntity<Object> updateUserInfo(@PathVariable("username") String username, @RequestBody UpdateUserDTO updatedUser) {
        try {
            if (userService.updateUserInfo(updatedUser)) {
                return new ResponseEntity<Object>(username, HttpStatus.OK);
            } else {
                return new ResponseEntity<Object>(username, HttpStatus.EXPECTATION_FAILED);
            }
        } catch (RequestDeniedException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @GetMapping("{username}/favourites")
    public List<Vinyl> getFavourites(@PathVariable("username") String username) {
        User user = userService.findByUsername(username);
        return user.getFavourites();
    }

    @PutMapping("{username}/favourites/{id}")
    public ResponseEntity<Object> manageFavourites(@PathVariable("username") String username, @PathVariable("id") Long vinylId) {
        try {
            User user = userService.findByUsername(username);
            Vinyl vinyl = vinylService.findById(vinylId);
            if(user.getFavourites().contains(vinyl)) {
                userService.removeFavourite(user, vinyl);
                return new ResponseEntity<Object>("Vinyl removed from favourites!", HttpStatus.OK);
            } else {
                userService.addFavourite(user, vinyl);
                return new ResponseEntity<Object>("Vinyl added to favourites!", HttpStatus.OK);
            }
        } catch (RequestDeniedException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }



}
