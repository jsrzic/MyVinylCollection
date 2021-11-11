package hr.fer.progi.MyVinylCollection.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Genre {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToOne(cascade=CascadeType.ALL)
    private Genre parentGenre;

    @OneToMany(mappedBy="parentGenre", cascade=CascadeType.ALL)
    private Set<Genre> subgenres;

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

    public Set<Genre> getSubgenres() {
        return subgenres;
    }

    public void setSubgenres(Set<Genre> subgenres) {
        this.subgenres = subgenres;
    }
}
