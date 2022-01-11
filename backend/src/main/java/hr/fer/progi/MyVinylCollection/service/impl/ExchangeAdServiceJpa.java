package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.ExchangeAdRepository;
import hr.fer.progi.MyVinylCollection.dao.UserRepository;
import hr.fer.progi.MyVinylCollection.dao.VinylRepository;
import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import hr.fer.progi.MyVinylCollection.domain.ExchangeOffer;
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
    public boolean exchangeVinyls(ExchangeOffer offer, User user) {
        if(offer.getAd().isActive()) {
            List<Vinyl> userCollection = user.getVinyls();
            userCollection.remove(offer.getGivingVinyl());
            userCollection.add(offer.getReceivingVinyl());
            userRepo.save(user);
            List<Vinyl> offerorCollection = offer.getOfferor().getVinyls();
            offerorCollection.remove(offer.getReceivingVinyl());
            offerorCollection.add(offer.getGivingVinyl());
            userRepo.save(offer.getOfferor());
            ExchangeAd ad = offer.getAd();
            ad.setActive(false);
            ad.setExchangedVinyl(offer.getReceivingVinyl());
            ad.setNewOwner(offer.getOfferor());
            exchangeAdRepo.save(ad);
            user.getOffers().remove(offer);
            return true;
        } else {
            user.getOffers().remove(offer);
            return false;
        }
    }

}
