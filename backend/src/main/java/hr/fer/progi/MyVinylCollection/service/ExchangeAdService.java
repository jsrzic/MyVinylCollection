package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;

import java.util.List;

public interface ExchangeAdService {

    List<ExchangeAd> getActiveAds();
    ExchangeAd newAd(ExchangeAd newAd);

}
