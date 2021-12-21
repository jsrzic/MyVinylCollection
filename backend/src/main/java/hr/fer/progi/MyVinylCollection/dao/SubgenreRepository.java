package hr.fer.progi.MyVinylCollection.dao;

import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.Subgenre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubgenreRepository extends JpaRepository<Subgenre, Long> {

    List<Subgenre> findByGenre(Genre genre);
    Subgenre findByName(String name);
}
