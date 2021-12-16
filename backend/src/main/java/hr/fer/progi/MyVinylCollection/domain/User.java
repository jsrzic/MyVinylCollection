package hr.fer.progi.MyVinylCollection.domain;

import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.List;

@Entity(name="users")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String surname;

    @Column(unique=true, nullable=false)
    private String username;

    private String password;

    @Email(message = "Email not in correct format")
    private String email;

    @Column(name="contact_email")
    private String contactEmail;

    @Column(name="is_active")
    private boolean isActive;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToMany(cascade=CascadeType.ALL)
    private List<Genre> preferredGenres;

    public User() {
    }

    public User(RegisterUserDTO user, List<Genre> userGenrePreference) {
        this.name = user.getName();
        this.surname = user.getSurname();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.contactEmail = user.getEmail();
        this.isActive = true;
        this.preferredGenres = userGenrePreference;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean active) {
        isActive = active;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<Genre> getPreferredGenres() {
        return preferredGenres;
    }

    public void setPreferredGenres(List<Genre> preferredGenres) {
        this.preferredGenres = preferredGenres;
    }
}
