package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.VinylRepository;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VinylServiceJpa implements VinylService {

    @Autowired
    private VinylRepository vinylRepo;


    @Override
    public Vinyl createVinyl(Vinyl vinyl) {
        return null;
    }

    @Override
    public boolean updateVinylInfo(Vinyl vinyl) {
        return false;
    }

    @Override
    public boolean deleteVinyl(long vinylId) {
        return false;
    }
}
