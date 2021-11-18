package hr.fer.progi.MyVinylCollection.rest;

import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.service.GenreService;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import hr.fer.progi.MyVinylCollection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private GenreService genreService;

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
}
