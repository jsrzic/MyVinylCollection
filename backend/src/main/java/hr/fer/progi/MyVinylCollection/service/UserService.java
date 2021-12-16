package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.rest.user.dto.LoginUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.UpdateUserDTO;

import java.util.List;

public interface UserService {

    List<User> listAll();
    boolean checkUsernameUnique(RegisterUserDTO user);
    User registerUser(RegisterUserDTO user, List<Genre> userGenrePreference);
    boolean checkUsernameExists(LoginUserDTO user);
    boolean checkPassword(LoginUserDTO user);
    String getUserContactEmail(Long userId);
    boolean updateUserStatus(Long userId, boolean status);
    UpdateUserDTO getUserInfo(String username);
    boolean updateUserInfo(UpdateUserDTO updatedUser);

}
