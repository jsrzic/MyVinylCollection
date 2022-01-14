package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.*;
import hr.fer.progi.MyVinylCollection.domain.*;
import hr.fer.progi.MyVinylCollection.mapper.MapStructMapper;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.AddVinylDTO;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.UpdateVinylDTO;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import hr.fer.progi.MyVinylCollection.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.quality.Strictness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles({"test"})
@ExtendWith(MockitoExtension.class)
class VinylServiceJpaTest {

    @Mock
    private VinylRepository vinylRepository;

    @InjectMocks
    private VinylServiceJpa vinylServiceJpa;

    @MockBean
    private ArtistRepository artistRepository;

    @MockBean
    private GenreRepository genreRepository;

    @MockBean
    private SubgenreRepository subgenreRepository;

    @MockBean
    private UserRepository userRepository;

    @Mock
    private MapStructMapper mapstructMapper;

    @BeforeEach
    public void setUp(){
        Genre genre1 = new Genre();
        genre1.setId(1L);
        genre1.setName("Rock");
        Genre genre2 = new Genre();
        genre2.setId(2L);
        genre2.setName("Pop");
        when(genreRepository.getById(1L)).thenReturn(genre1);
        when(genreRepository.getById(2L)).thenReturn(genre2);

        Subgenre subgenre = new Subgenre();
        subgenre.setId(1L);
        subgenre.setName("subgenre");
        subgenre.setGenre(genre1);
        when(subgenreRepository.getById(1L)).thenReturn(subgenre);

        Artist artist = new Artist();
        artist.setId(1L);
        artist.setName("Mate Mišo");
        when(artistRepository.getById(1L)).thenReturn(artist);

        RegisterUserDTO registerUserDTO = new RegisterUserDTO();
        registerUserDTO.setName("Marta");
        registerUserDTO.setSurname("Dubilić");
        registerUserDTO.setUsername("mdulibic");
        registerUserDTO.setPassword("123456789");
        registerUserDTO.setEmail("mdulibic@gmail.com");
        User user = new User(registerUserDTO, null, null);
        given(userRepository.getById(1L)).willReturn(user);

        AddVinylDTO vinylDto = new AddVinylDTO();
        vinylDto.setAlbum("Slušaj mater");
        vinylDto.setArtistId(5L);
        vinylDto.setReleaseYear(1948);
        vinylDto.setGenreId(1L);
        vinylDto.setSubgenreId(1L);
        vinylDto.setConditionEvaluation(4);
        vinylDto.setRare(false);
        vinylDto.setDescription("blab123");
        vinylDto.setPriceKn(50.0);
        vinylDto.setRPM("33");
        vinylDto.setDiameter(2.0);
        vinylDto.setCapacity("50");
        vinylDto.setReproductionQuality("good");
        vinylDto.setNmbOfAudioChannels(3);
        vinylDto.setTimeOfReproduction(LocalTime.parse("01:24:00"));

        Vinyl vinyl1 = new Vinyl(vinylDto, artist, genre1, subgenre);
        vinyl1.setOwner(user);
        //vinylRepository.save(vinyl1);
        given(vinylRepository.findById(1L)).willReturn(java.util.Optional.of(vinyl1));
    }


    @Test
    void demoTestMethod() {
        assertTrue(true);
    }

    @Test
    void testFindById(){
        Vinyl v = vinylServiceJpa.findById(1L);
        assertEquals("Slušaj mater", v.getAlbum());
        System.out.println(v);
    }

    @Test
    void testFindByIdWrongId(){
        assertThrows(RequestDeniedException.class, () -> vinylServiceJpa.findById(10L));
    }

    @Test
    void testAddNewVinyl(){
        AddVinylDTO vinylDto = new AddVinylDTO();
        vinylDto.setAlbum("Bajaga");
        vinylDto.setArtistId(5L);
        vinylDto.setReleaseYear(1948);
        vinylDto.setGenreId(1L);
        vinylDto.setSubgenreId(1L);
        vinylDto.setConditionEvaluation(4);
        vinylDto.setRare(false);
        vinylDto.setDescription("blablabla");
        vinylDto.setPriceKn(50.0);
        vinylDto.setRPM("33");
        vinylDto.setDiameter(2.0);
        vinylDto.setCapacity("50");
        vinylDto.setReproductionQuality("good");
        vinylDto.setNmbOfAudioChannels(3);
        vinylDto.setTimeOfReproduction(LocalTime.parse("01:24:00"));


        Artist artist = artistRepository.getById(1L);
        Genre genre = genreRepository.getById(2L);
        Subgenre subgenre = subgenreRepository.getById(1L);

        RegisterUserDTO registerUserDTO = new RegisterUserDTO();
        registerUserDTO.setName("Marta");
        registerUserDTO.setSurname("Dubilić");
        registerUserDTO.setUsername("mdulibic");
        registerUserDTO.setPassword("123456789");
        registerUserDTO.setEmail("mdulibic@gmail.com");
        User user = new User(registerUserDTO, null, null);

        Vinyl vinyl = new Vinyl(vinylDto, artist, genre, subgenre);
        vinylServiceJpa.addVinyl(vinyl, userRepository.getById(1L));
        System.out.println(vinylRepository.findAll());
        //System.out.println(user);
    }

    @Test
    public void testDeleteVinyl(){
        vinylServiceJpa.deleteVinyl(1L);
        verify(vinylRepository).deleteById(1L);
    }

}