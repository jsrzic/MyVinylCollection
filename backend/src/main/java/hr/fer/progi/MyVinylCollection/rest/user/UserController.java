package hr.fer.progi.MyVinylCollection.rest.user;

import com.maxmind.geoip2.exception.GeoIp2Exception;
import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.Location;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.rest.security.VinylUserDetails;
import hr.fer.progi.MyVinylCollection.rest.security.jwt.JwtResponse;
import hr.fer.progi.MyVinylCollection.rest.security.jwt.JwtUtils;
import hr.fer.progi.MyVinylCollection.rest.user.dto.LoginUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.UpdateUserDTO;
import hr.fer.progi.MyVinylCollection.service.GenreService;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import hr.fer.progi.MyVinylCollection.service.UserService;
import hr.fer.progi.MyVinylCollection.service.VinylService;
import hr.fer.progi.MyVinylCollection.service.impl.LocationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

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
    private LocationServiceImpl locationService;


    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("")
    public List<User> listUsers() {
        return userService.listAll();
    }

    @PostMapping("/auth/register")
    public User registerUser(@RequestBody RegisterUserDTO user) throws IOException, GeoIp2Exception {
        if (userService.checkUsernameUnique(user)) {
            List<Genre> userGenrePreference = genreService.getGenresById(user.getPreferredGenres());
            return userService.registerUser(user, userGenrePreference, getLocationFromIp(user.getIp()));
        } else {
            throw new IllegalArgumentException("Username already exists.");
        }
    }

    private Location getLocationFromIp(String ip) throws IOException, GeoIp2Exception {
        Location location = locationService.getLocation(ip);
        locationService.saveLocation(location);
        return location;
    }

    private ResponseEntity<Object> authenticateUser(LoginUserDTO user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        VinylUserDetails userDetails = (VinylUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.user.getId(),
                userDetails.getUsername(),
                userDetails.user.getEmail(),
                roles));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> loginUser(@RequestBody LoginUserDTO user) {
        if (userService.checkUsernameExists(user) && userService.checkPassword(user)) {
            return authenticateUser(user);
        } else {
            throw new IllegalArgumentException("Invalid username/password.");
        }
    }

    @GetMapping("/contact_email/{id}")
    public String getUserContactEmail(@PathVariable("id") Long userId){
        try{
            return userService.getUserContactEmail(userId);
        }catch(RequestDeniedException e){
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
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

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/info/{username}")
    public UpdateUserDTO getUserInfo(@PathVariable("username") String username){
        try{
            return userService.getUserInfo(username);
        }catch(RequestDeniedException e){
            throw new IllegalArgumentException(e.getMessage());
        }

    }

    @PreAuthorize("hasRole('ROLE_USER')")
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

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("{username}/favourites")
    public List<Vinyl> getFavourites(@PathVariable("username") String username) {
        User user = userService.findByUsername(username);
        return user.getFavourites();
    }
    @PreAuthorize("hasRole('ROLE_USER')")
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

    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @GetMapping("/current")
    public VinylUserDetails getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (VinylUserDetails) auth.getPrincipal();
    }

    @GetMapping("/friends")
    public List<User> getFriends() {
        User user = getCurrentUser().user;
       return user.getFriends();
    }

}
