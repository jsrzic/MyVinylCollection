package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.ExchangeAdRepository;
import hr.fer.progi.MyVinylCollection.dao.VinylRepository;
import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.service.ExchangeAdService;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExchangeAdServiceJpa implements ExchangeAdService {

    @Autowired
    private ExchangeAdRepository exchangeAdRepo;

    @Autowired
    private VinylRepository vinylRepo;

    @Override
    public List<ExchangeAd> getActiveAds() {
        return exchangeAdRepo.getActiveAds();
    }

    @Override
    public ExchangeAd newAd(ExchangeAd newAd) {
        return exchangeAdRepo.save(newAd);
    }

    @Override
    public boolean deleteAd(Long id, User owner) {
        if(!owner.equals(exchangeAdRepo.findById(id).get().getCreator()))
            throw new RequestDeniedException("You are not owner of this ad.");
        exchangeAdRepo.deleteById(id);
        return true;
    }

    @Override
    public boolean exchangeOwners(Long adId, Long newOwnerId, User owner) {
        if(!owner.equals(exchangeAdRepo.findById(adId).get().getCreator()))
            throw new RequestDeniedException("You are not owner of this ad.");
        ExchangeAd ad = exchangeAdRepo.exchangeOwners(adId, newOwnerId);
        vinylRepo.save(ad.getVinyl());
        if(ad.getId().equals(adId))
            return true;
        return false;
    }
}
