package hr.fer.progi.MyVinylCollection.rest.security;

import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserSession {

    @Autowired
    private UserService userService;

    public User getUser() {
        return getUsername() == "guest" ? null : userService.findByUsername(getUsername());
    }

    public String getUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = ((VinylUserDetails) auth.getPrincipal()).getUsername();
        if(username == "guest") {
            return "guest";
        } else {
            return ((VinylUserDetails) auth.getPrincipal()).getUsername();
        }

    }
}
