package hr.fer.progi.MyVinylCollection.rest.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserSession {

    public VinylUserDetails getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (VinylUserDetails) auth.getPrincipal();
    }

    public String getUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ((VinylUserDetails) auth.getPrincipal()).getUsername();
    }
}
