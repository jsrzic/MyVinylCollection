package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.UserRepository;
import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.mapper.MapStructMapper;
import hr.fer.progi.MyVinylCollection.rest.user.dto.LoginUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.UpdateUserDTO;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import hr.fer.progi.MyVinylCollection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceJpa implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private MapStructMapper mapstructMapper;

    @Override
    public List<User> listAll() {
        return userRepo.findAll();
    }

    @Override
    public boolean checkUsernameUnique(RegisterUserDTO user) {
        return userRepo.countByUsername(user.getUsername()) == 0;
    }

    @Override
    public User registerUser(RegisterUserDTO user, List<Genre> userGenrePreference) {
        return userRepo.save(new User(user, userGenrePreference));
    }

    @Override
    public boolean checkUsernameExists(LoginUserDTO user) {
        if(userRepo.countByUsername(user.getUsername()) == 0) {
            return false;
        }
        return true;
    }

    @Override
    public boolean checkPassword(LoginUserDTO user) {
        return userRepo.findByUsername(user.getUsername()).getPassword().equals(user.getPassword());
    }

    @Override
    public String getUserContactEmail(Long userId) {
        if(userRepo.findById(userId).isEmpty())
            throw new RequestDeniedException("No user with id:" + userId);

        return userRepo.getById(userId).getContactEmail();
    }


    @Override
    public boolean updateUserStatus(Long userId, boolean status) {
        if(userRepo.findById(userId).isEmpty())
            throw new RequestDeniedException("No user with id:" + userId);

        if(userRepo.updateUserStatus(userId, status).getIsActive() == status)
                return true;
        return false;
    }

    @Override
    public UpdateUserDTO getUserInfo(String username) {
        User user = userRepo.findByUsername(username);
        if(user == null) {
            throw new RequestDeniedException("No user with username:" + username);
        } else {
            return mapstructMapper.userToUpdateUserDTO(user);
        }
    }

    @Override
    public boolean updateUserInfo(UpdateUserDTO updatedUser) {
        User user = userRepo.findByUsername(updatedUser.getUsername());
        mapstructMapper.updateUserDTOToUser(updatedUser, user);
        if(user == null) {
            throw new RequestDeniedException("No user with username:" + updatedUser.getUsername());
        } else {
            userRepo.save(user);
            return true;
        }

    }
}
