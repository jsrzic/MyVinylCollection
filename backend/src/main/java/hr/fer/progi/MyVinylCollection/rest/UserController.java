package hr.fer.progi.MyVinylCollection.rest;

import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import hr.fer.progi.MyVinylCollection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("")
    public List<User> listUsers() {
        return userService.listAll();
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody RegisterUserDTO user) {
        if (userService.checkUsernameUnique(user)) {
            return userService.registerUser(user);
        } else {
            throw new RequestDeniedException("Username already exists.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody LoginUserDTO user) {
        if (userService.checkUsernameExists(user) && userService.checkPassword(user)) {
            return new ResponseEntity<Object>(user, HttpStatus.OK);
        } else {
            throw new RequestDeniedException("Invalid username/password.");
        }
    }
}
