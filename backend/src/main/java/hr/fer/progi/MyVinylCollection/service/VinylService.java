package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;

public interface VinylService {

    Vinyl addVinyl(Vinyl vinyl, User user);
    boolean updateVinylInfo(Vinyl vinyl);
    boolean deleteVinyl(long vinylId);
}
