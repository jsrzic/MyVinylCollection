package hr.fer.progi.MyVinylCollection.dao;

import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SaleAdRepository extends JpaRepository<SaleAd, Long> {

    @Query("SELECT s FROM sale_ad s WHERE s.isActive = true")
    List<SaleAd> getActiveAds();

    @Modifying
    @Query("UPDATE sale_ad s SET s.isActive = false WHERE s =: ad")
    SaleAd setSaleAdInactive(@Param("ad") SaleAd ad);
}
