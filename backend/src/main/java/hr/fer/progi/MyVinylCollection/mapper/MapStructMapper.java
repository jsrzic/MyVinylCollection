package hr.fer.progi.MyVinylCollection.mapper;

import hr.fer.progi.MyVinylCollection.domain.Event;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.rest.event.dto.EventDTO;
import hr.fer.progi.MyVinylCollection.rest.user.dto.UpdateUserDTO;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.UpdateVinylDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface MapStructMapper {

    UpdateUserDTO userToUpdateUserDTO(User user);
    UpdateVinylDTO vinylToUpdateVinylDTO(Vinyl vinyl);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User updateUserDTOToUser(UpdateUserDTO dto, @MappingTarget User entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Vinyl updateVinylDTOToVinyl(UpdateVinylDTO dto, @MappingTarget Vinyl entity);

<<<<<<< HEAD
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Event updateEventDTOtoEvent(EventDTO dto, @MappingTarget Event entity);
=======
>>>>>>> 9b5239049d7a35b77a4c8828bd0bed370f30c0b7
}
