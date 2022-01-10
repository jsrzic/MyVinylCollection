package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.SaleAdRepository;
import hr.fer.progi.MyVinylCollection.dao.UserRepository;
import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import hr.fer.progi.MyVinylCollection.service.SaleAdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleAdServiceJpa implements SaleAdService {

    @Autowired
    private SaleAdRepository saleAdRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<SaleAd> getActiveAds() {
        return saleAdRepo.getActiveAds();
    }

    @Override
    public SaleAd newAd(SaleAd newAd, User creator) {
        creator.getSaleAds().add(newAd);
        return saleAdRepo.save(newAd);
    }

    @Override
    public boolean deleteAd(Long id, User owner) {
        owner.getSaleAds().remove(saleAdRepo.findById(id).orElseThrow(
                () -> new RequestDeniedException("You are not owner of this ad.")));
        saleAdRepo.deleteById(id);
        return true;
    }

    @Override
    public boolean setSaleAdInactive(Long id, User owner) {
        if(!owner.equals(saleAdRepo.findById(id).get().getCreator()))
            throw new RequestDeniedException("You are not owner of this ad.");
        SaleAd saleAd = saleAdRepo.setSaleAdInactive(id);
        if(id.equals(saleAd.getId()))
            return true;
        return false;
    }
}
