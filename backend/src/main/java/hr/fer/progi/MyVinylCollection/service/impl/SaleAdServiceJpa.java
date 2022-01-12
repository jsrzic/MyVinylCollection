package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.SaleAdRepository;
import hr.fer.progi.MyVinylCollection.dao.UserRepository;
import hr.fer.progi.MyVinylCollection.dao.VinylRepository;
import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import hr.fer.progi.MyVinylCollection.service.SaleAdService;
import net.bytebuddy.implementation.FieldAccessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleAdServiceJpa implements SaleAdService {

    @Autowired
    private SaleAdRepository saleAdRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private VinylRepository vinylRepo;

    @Override
    public List<SaleAd> getActiveAds(User user) {
        return saleAdRepo.getActiveAds(user);
    }

    @Override
    public SaleAd newAd(SaleAd newAd, User creator) {
        creator.getSaleAds().add(newAd);
        saleAdRepo.save(newAd);
        userRepo.save(creator);
        return newAd;
    }

    @Override
    public boolean deleteAd(Long id, User owner) {
        owner.getSaleAds().remove(saleAdRepo.findById(id).orElseThrow(
                () -> new RequestDeniedException("You are not owner of this ad.")));
        saleAdRepo.deleteById(id);
        return true;
    }

    @Override
    public boolean buyVinyl(SaleAd ad, User owner, User newOwner) {
        SaleAd saleAd = saleAdRepo.setSaleAdInactive(ad);
        saleAd.getVinyl().setOwner(newOwner);
        vinylRepo.save(saleAd.getVinyl());
        owner.getVinyls().remove(saleAd.getVinyl());
        userRepo.save(owner);
        newOwner.getVinyls().add(saleAd.getVinyl());
        userRepo.save(newOwner);
        return true;
    }
}
