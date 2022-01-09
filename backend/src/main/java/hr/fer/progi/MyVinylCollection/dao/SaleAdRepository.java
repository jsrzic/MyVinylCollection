package hr.fer.progi.MyVinylCollection.dao;

import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SaleAdRepository extends JpaRepository<SaleAd, Long> {

    @Query("SELECT s FROM sale_ad s WHERE s.isActive =: true")
    List<SaleAd> getActiveAds();

}
