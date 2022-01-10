package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import hr.fer.progi.MyVinylCollection.domain.User;

import java.util.List;

public interface SaleAdService {

    List<SaleAd> getActiveAds();
    SaleAd newAd(SaleAd saleAd, User creator);
    boolean deleteAd(Long id, User owner);
    boolean setSaleAdInactive(Long id, User owner, User newOwner);

}
