package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.ExchangeAdRepository;
import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import hr.fer.progi.MyVinylCollection.service.AdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExchangeAdServiceJpa implements AdService {

    @Autowired
    private ExchangeAdRepository exchangeAdRepo;

    @Override
    public List<ExchangeAd> getActiveAds() {
        return exchangeAdRepo.getActiveAds();
    }

    @Override
    public Object newAd(Object newAd) {
        return null;
    }
}
