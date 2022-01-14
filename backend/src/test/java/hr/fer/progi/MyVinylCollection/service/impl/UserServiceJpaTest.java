package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.GenreRepository;
import hr.fer.progi.MyVinylCollection.dao.UserRepository;
import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.service.UserService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceJpaTest {

    @MockBean
    private UserRepository userRepository;

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
        userServiceJpa = new UserServiceJpa();

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
    void testGetAllUsers() {
        userServiceJpa.listAll();
        verify(userRepository).findAll();
    }

    @Test
    void testRegisterUser(){
        User newUser = userServiceJpa.registerUser(registerUserDTO, null, null);
        //registerUserDTO.setPassword(passwordEncoder.encode(registerUserDTO.getPassword()));
        //user =  userRepository.save(new User(registerUserDTO, null, null));
        //System.out.println(userRepository.findAll());
        //System.out.println(user);

        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);

        verify(userRepository).save(userArgumentCaptor.capture());
        User capturedUser = userArgumentCaptor.getValue();

        assertThat(capturedUser).isEqualTo(newUser);

        //user = userServiceJpa.registerUser(registerUserDTO, null, null);
        //assertEquals("mdulibic", user.getUsername());
    }

}