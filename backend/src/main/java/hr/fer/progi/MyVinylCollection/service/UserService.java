package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.rest.LoginUserDTO;
import hr.fer.progi.MyVinylCollection.rest.RegisterUserDTO;

import java.util.List;

public interface UserService {

    List<User> listAll();
    boolean checkUsernameUnique(RegisterUserDTO user);
    User registerUser(RegisterUserDTO user);
    boolean checkUsernameExists(LoginUserDTO user);
    boolean checkPassword(LoginUserDTO user);
}
