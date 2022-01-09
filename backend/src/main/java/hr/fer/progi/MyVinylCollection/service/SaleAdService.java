package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.SaleAd;

import java.util.List;

public interface SaleAdService {

    List<SaleAd> getActiveAds();
    SaleAd newAd(SaleAd saleAd);
}
