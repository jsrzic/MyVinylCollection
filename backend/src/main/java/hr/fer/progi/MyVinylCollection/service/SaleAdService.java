package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;

import java.util.List;

public interface SaleAdService {

    List<SaleAd> getActiveAds(User user);
    SaleAd newAd(SaleAd saleAd, User creator);
    boolean deleteAd(Long id, User owner);
    boolean buyVinyl(SaleAd ad, User owner, User newOwner);

}
