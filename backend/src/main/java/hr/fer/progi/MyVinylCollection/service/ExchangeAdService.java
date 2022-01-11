package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import hr.fer.progi.MyVinylCollection.domain.ExchangeOffer;
import hr.fer.progi.MyVinylCollection.domain.User;

import java.util.List;

public interface ExchangeAdService {

    List<ExchangeAd> getActiveAds();
    ExchangeAd newAd(ExchangeAd newAd);
    boolean deleteAd(Long id, User owner);
    boolean exchangeVinyls(ExchangeOffer offer, User user);

}
