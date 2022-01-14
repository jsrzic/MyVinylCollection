package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.GenreRepository;
import hr.fer.progi.MyVinylCollection.dao.UserRepository;
import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceJpaTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserServiceJpa userServiceJpa;

    @Mock
    private GenreRepository genreRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @MockBean
    private User user;

    @InjectMocks
    RegisterUserDTO registerUserDTO;

    private List<Genre> userGenrePreference;

    @BeforeEach
    public void setUp(){
        registerUserDTO = new RegisterUserDTO();
        registerUserDTO.setName("Marta");
        registerUserDTO.setSurname("Dubilić");
        registerUserDTO.setUsername("mdulibic");
        registerUserDTO.setPassword("123456789");
        registerUserDTO.setEmail("mdulibic@gmail.com");

        Genre genre1 = new Genre();
        genre1.setId(1L);
        genre1.setName("Rock");
        Genre genre2 = new Genre();
        genre2.setId(2L);
        genre2.setName("Pop");

        userGenrePreference = new ArrayList<Genre>();
        when(genreRepository.getById(1L)).thenReturn(genre1);
        when(genreRepository.getById(2L)).thenReturn(genre2);
        userGenrePreference.add(genreRepository.getById(1L));
        userGenrePreference.add(genreRepository.getById(2L));


    }

    @Test
    void testRegisterUser(){
        userServiceJpa.registerUser(registerUserDTO, null, null);
        registerUserDTO.setPassword(passwordEncoder.encode(registerUserDTO.getPassword()));
        user =  userRepository.save(new User(registerUserDTO, null, null));
        System.out.println(userRepository.findAll());
        System.out.println(user);
        //user = userServiceJpa.registerUser(registerUserDTO, null, null);
        //assertEquals("mdulibic", user.getUsername());
    }

}