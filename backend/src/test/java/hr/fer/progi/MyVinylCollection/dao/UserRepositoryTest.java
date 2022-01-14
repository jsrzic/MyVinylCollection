package hr.fer.progi.MyVinylCollection.dao;

import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private GenreRepository genreRepository;

    @Test
    void testFindByUsername() {
        //given
        //String username = passwordEncoder.encode();
        RegisterUserDTO registerUserDTO = new RegisterUserDTO();
        registerUserDTO = new RegisterUserDTO();
        registerUserDTO.setName("Marta");
        registerUserDTO.setSurname("Dubilić");
        registerUserDTO.setUsername("mdulibic");
        registerUserDTO.setPassword("123456789");
        registerUserDTO.setPassword(passwordEncoder.encode(registerUserDTO.getPassword()));
        registerUserDTO.setEmail("mdulibic@gmail.com");
        Genre genre1 = new Genre();
        genre1.setId(1L);
        genre1.setName("Rock");
        Genre genre2 = new Genre();
        genre2.setId(2L);
        genre2.setName("Pop");

        List<Genre> userGenrePreference = new ArrayList<Genre>();
        userGenrePreference.add(genreRepository.getById(1L));
        userGenrePreference.add(genreRepository.getById(2L));
        User user = new User(registerUserDTO, null, null);
        User saved = userRepository.save(user);

    }
}