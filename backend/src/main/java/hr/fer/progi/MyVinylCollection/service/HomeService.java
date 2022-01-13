package hr.fer.progi.MyVinylCollection.service;

import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;

import java.util.List;

public interface HomeService {

    List<Vinyl> getVinyls(User user);

}
