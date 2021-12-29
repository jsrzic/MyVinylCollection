package hr.fer.progi.MyVinylCollection.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.List;

@Entity(name="vinyl_user")
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

    private String location;

    @Column(name="is_active")
    private boolean isActive;

    @ManyToMany(cascade=CascadeType.ALL)
    private List<Genre> preferredGenres;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Vinyl> vinyls;

    @ManyToMany(cascade=CascadeType.ALL)
    private List<Artist> subcollections;

    @ManyToMany(cascade=CascadeType.ALL)
    private List<Vinyl> favourites;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<SaleAd> saleAds;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ExchangeAd> exchangeAds;

    @OneToOne(mappedBy = "vinyl_user")
    private ExchangeAd exchangedAd;

    public User() {}

    public User(RegisterUserDTO user, List<Genre> userGenrePreference) {
        this.name = user.getName();
        this.surname = user.getSurname();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.contactEmail = user.getEmail();
        this.isActive = true;
        this.location = "";
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

    public List<Genre> getPreferredGenres() {
        return preferredGenres;
    }

    public void setPreferredGenres(List<Genre> preferredGenres) {
        this.preferredGenres = preferredGenres;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public List<Vinyl> getVinyls() {
        return vinyls;
    }

    public void setVinyls(List<Vinyl> vinyls) {
        this.vinyls = vinyls;
    }

    public List<Artist> getSubcollections() {
        return subcollections;
    }

    public void setSubcollections(List<Artist> subcollections) {
        this.subcollections = subcollections;
    }

    public List<Vinyl> getFavourites() {
        return favourites;
    }

    public void setFavourites(List<Vinyl> favourites) {
        this.favourites = favourites;
    }

    public List<SaleAd> getSaleAds() {
        return saleAds;
    }

    public void setSaleAds(List<SaleAd> saleAds) {
        this.saleAds = saleAds;
    }

    public List<ExchangeAd> getExchangeAds() {
        return exchangeAds;
    }

    public void setExchangeAds(List<ExchangeAd> exchangeAds) {
        this.exchangeAds = exchangeAds;
    }

    public ExchangeAd getExchangedAd() {
        return exchangedAd;
    }

    public void setExchangedAd(ExchangeAd exchangedAd) {
        this.exchangedAd = exchangedAd;
    }
}
