package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.ExchangeAdRepository;
import hr.fer.progi.MyVinylCollection.dao.UserRepository;
import hr.fer.progi.MyVinylCollection.dao.VinylRepository;
import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
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

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<ExchangeAd> getActiveAds() {
        return exchangeAdRepo.getActiveAds();
    }

    @Override
    public ExchangeAd newAd(ExchangeAd newAd) {
        if(!newAd.getCreator().equals(newAd.getVinyl().getOwner()))
            throw new RequestDeniedException("You are not owner of this ad.");
        newAd.getCreator().getExchangeAds().add(newAd);
        userRepo.save(newAd.getCreator());
        return exchangeAdRepo.save(newAd);
    }

    @Override
    public boolean deleteAd(Long id, User owner) {
        if(!owner.equals(exchangeAdRepo.findById(id).get().getCreator()))
            throw new RequestDeniedException("You are not owner of this ad.");
        owner.getExchangeAds().remove(exchangeAdRepo.findById(id));
        userRepo.save(owner);
        exchangeAdRepo.deleteById(id);
        return true;
    }

    @Override
    public boolean exchangeOwners(Long adId, Long newOwnerId, User owner, Vinyl exchangedVinyl) {
        if(!owner.equals(exchangeAdRepo.findById(adId).get().getCreator()))
            throw new RequestDeniedException("You are not owner of this ad.");
        ExchangeAd ad = exchangeAdRepo.exchangeOwners(adId, newOwnerId, exchangedVinyl.getId());
        ad.getVinyl().setOwner(ad.getNewOwner());
        vinylRepo.save(ad.getVinyl());
        exchangedVinyl.setOwner(owner);
        vinylRepo.save(exchangedVinyl);
        owner.getVinyls().remove(ad.getVinyl());
        owner.getVinyls().add(exchangedVinyl);
        userRepo.save(owner);
        userRepo.findById(newOwnerId).get().getVinyls().remove(exchangedVinyl);
        userRepo.findById(newOwnerId).get().getVinyls().add(ad.getVinyl());
        return true;

    }
}
