package hr.fer.progi.MyVinylCollection.mapper;

import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.rest.user.dto.UpdateUserDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface MapStructMapper {

    UpdateUserDTO userToUpdateUserDTO(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User updateUserDTOToUser(UpdateUserDTO dto, @MappingTarget User entity);
}
