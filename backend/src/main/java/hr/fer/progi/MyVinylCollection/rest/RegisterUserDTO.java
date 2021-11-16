package hr.fer.progi.MyVinylCollection.rest;

import java.util.List;
import java.util.Set;

public class RegisterUserDTO {

    private String name;
    private String surname;
    private String username;
    private String password;
    private String email;
    private List<Long> preferedGenres;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Long> getPreferedGenres() {
        return preferedGenres;
    }

    public void setPreferedGenres(List<Long> preferedGenres) {
        this.preferedGenres = preferedGenres;
    }
}
