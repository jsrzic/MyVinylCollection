package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.SaleAdRepository;
import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import hr.fer.progi.MyVinylCollection.service.SaleAdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleAdServiceJpa implements SaleAdService {

    @Autowired
    private SaleAdRepository saleAdRepo;

    @Override
    public List<SaleAd> getActiveAds() {
        return saleAdRepo.getActiveAds();
    }

    @Override
    public SaleAd newAd(SaleAd newAd) {
        return saleAdRepo.save(newAd);
    }
}
