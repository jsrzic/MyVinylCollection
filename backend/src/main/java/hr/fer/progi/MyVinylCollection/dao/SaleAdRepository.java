package hr.fer.progi.MyVinylCollection.dao;

import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleAdRepository extends JpaRepository<SaleAd, Long> {
}
