package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.SaleAdRepository;
import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import hr.fer.progi.MyVinylCollection.service.AdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleAdServiceJpa implements AdService {

    @Autowired
    private SaleAdRepository saleAdRepo;

    @Override
    public List<SaleAd> getActiveAds() {
        return saleAdRepo.getActiveAds();
    }

    @Override
    public Object newAd(Object newAd) {
        return saleAdRepo.save((SaleAd) newAd);
    }
}
