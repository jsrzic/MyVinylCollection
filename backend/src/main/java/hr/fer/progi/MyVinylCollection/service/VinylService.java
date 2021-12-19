package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.Vinyl;

public interface VinylService {

    Vinyl createVinyl(Vinyl vinyl);
    boolean updateVinylInfo(Vinyl vinyl);
    boolean deleteVinyl(long vinylId);
}
