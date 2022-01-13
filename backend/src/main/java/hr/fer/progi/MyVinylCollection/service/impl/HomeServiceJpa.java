package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.ExchangeAdRepository;
import hr.fer.progi.MyVinylCollection.dao.SaleAdRepository;
import hr.fer.progi.MyVinylCollection.dao.VinylRepository;
import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HomeServiceJpa implements HomeService {

    @Autowired
    private VinylRepository vinylRepo;

    @Autowired
    private SaleAdRepository saleAdRepo;

    @Autowired
    private ExchangeAdRepository exchangeAdRepo;

    @Override
    public List<Vinyl> getVinyls(User user) {
        List<Genre> genres = user.getPreferredGenres();
        return vinylRepo.findByOwnerNot(user).stream().filter(v -> genres.contains(v.getGenre()) && !v.getOwner().getId().equals(user.getId())).collect(Collectors.toList());
    }
}
