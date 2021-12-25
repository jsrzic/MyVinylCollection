package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.UserRepository;
import hr.fer.progi.MyVinylCollection.dao.VinylRepository;
import hr.fer.progi.MyVinylCollection.domain.Artist;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.mapper.MapStructMapper;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.UpdateVinylDTO;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import hr.fer.progi.MyVinylCollection.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VinylServiceJpa implements VinylService {

    @Autowired
    private VinylRepository vinylRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private MapStructMapper mapstructMapper;


    @Override
    public Vinyl addVinyl(Vinyl vinyl, User user) {
        vinyl.setOwner(user);
        user.getVinyls().add(vinyl);
        return vinylRepo.save(vinyl);
    }

    @Override
    public UpdateVinylDTO getVinylInfo(long vinylId) {
        Vinyl vinyl = vinylRepo.findById(vinylId).orElseThrow(
                () -> new RequestDeniedException("No vinyl with id " + vinylId)
        );
        return mapstructMapper.vinylToUpdateVinylDTO(vinyl);
    }

    @Override
    public boolean updateVinylInfo(long vinylId, UpdateVinylDTO updatedVinyl) {
        Vinyl vinyl = vinylRepo.findById(vinylId).orElseThrow(
                () -> new RequestDeniedException("No vinyl with id " + vinylId)
        );
        mapstructMapper.updateVinylDTOToVinyl(updatedVinyl, vinyl);
        vinylRepo.save(vinyl);
        return true;
    }

    @Override
    public boolean deleteVinyl(long vinylId) {
        User owner = vinylRepo.findById(vinylId).orElseThrow(
                () -> new RequestDeniedException("No vinyl with id " + vinylId)
        ).getOwner();
        owner.getVinyls().remove(vinylRepo.getById(vinylId));
        vinylRepo.deleteById(vinylId);
        if(!vinylRepo.findById(vinylId).isPresent())
            return true;
        return false;
    }

    @Override
    public void createCollection(Artist artist, User user) {
        user.getSubcollections().add(artist);
        userRepo.save(user);
    }

}
