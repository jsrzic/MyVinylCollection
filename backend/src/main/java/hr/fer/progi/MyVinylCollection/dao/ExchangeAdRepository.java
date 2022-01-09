package hr.fer.progi.MyVinylCollection.dao;

import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExchangeAdRepository extends JpaRepository<ExchangeAd, Long> {

    @Query("SELECT e FROM exchange_ad e WHERE e.isActive =: true")
    List<ExchangeAd> getActiveAds();

}
